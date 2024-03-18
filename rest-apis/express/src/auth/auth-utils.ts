import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

function getDurationInSeconds(duration: string): number {
  // example 15d, 1h, 30m, 10s
  const durationUnit = duration.slice(-1);
  const durationValue = parseInt(duration.slice(0, -1));
  let durationInSeconds = 0;
  switch (durationUnit) {
    case "d":
      durationInSeconds = durationValue * 24 * 60 * 60;
      break;
    case "h":
      durationInSeconds = durationValue * 60 * 60;
      break;
    case "m":
      durationInSeconds = durationValue * 60;
      break;
    case "s":
      durationInSeconds = durationValue;
      break;
  }
  return durationInSeconds;
}
export function generateJwtToken(payload: any) {
  const access_token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  const durationInSeconds = getDurationInSeconds(process.env.JWT_EXPIRATION!);
  return { access_token, durationInSeconds };
}

export async function verifyJwtToken(token: string): Promise<any> {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
