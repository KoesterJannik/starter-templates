import { Request, Response } from "express";
import db from "../../db";
import { comparePasswords, hashPassword } from "../../auth/auth-utils";

export async function changeUsersPassword(req: Request, res: Response) {
  if (!req.body.oldPassword || !req.body.newPassword)
    return res
      .status(400)
      .json({ message: "Old password and new password are required" });
  const { oldPassword, newPassword } = req.body;
  const user = await db.user.findUnique({
    where: { id: req.user!.id },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isPasswordValid = await comparePasswords(oldPassword, user.password);
  if (!isPasswordValid) {
    console.log("Invalid password");
    return res.status(401).json({ message: "Invalid password" });
  }
  const hashedPassword = await hashPassword(newPassword);
  await db.user.update({
    where: { id: req.user!.id },
    data: { password: hashedPassword },
  });
  return res.status(200).json({ message: "Password updated" });
}
