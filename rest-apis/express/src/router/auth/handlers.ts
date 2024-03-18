import { Request, Response } from "express";
import db from "../../db";
import {
  comparePasswords,
  generateJwtToken,
  hashPassword,
} from "../../auth/auth-utils";
import { generateTokenWithUserId } from "./helper-functions";

export async function registerUser(req: Request, res: Response) {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ message: "email and password are required" });
  const isEmailInUse = await db.user.findFirst({
    where: { email: req.body.email },
  });
  if (isEmailInUse)
    return res.status(400).json({ message: "email is already in use" });
  const hashedPassword = await hashPassword(req.body.password);
  const newUser = await db.user.create({
    data: { email: req.body.email, password: hashedPassword },
  });

  if (!newUser) return res.status(500).json({ message: "error creating user" });

  const { access_token, durationInSeconds } = generateTokenWithUserId(
    newUser.id
  );
  return res.status(201).json({ access_token, durationInSeconds });
}

export async function loginUser(req: Request, res: Response) {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ message: "email and password are required" });
  const user = await db.user.findFirst({
    where: { email: req.body.email },
  });
  if (!user) return res.status(401).json({ message: "invalid email" });
  const isMatch = await comparePasswords(req.body.password, user.password);
  if (!isMatch) return res.status(401).json({ message: "invalid password" });
  const { access_token, durationInSeconds } = generateTokenWithUserId(user.id);
  return res.status(200).json({ access_token, durationInSeconds });
}

export async function getProfile(req: Request, res: Response) {
  const user = await db.user.findUnique({
    where: { id: req.user!.id },
  });
  return res.status(200).json({ ...user, password: undefined });
}
