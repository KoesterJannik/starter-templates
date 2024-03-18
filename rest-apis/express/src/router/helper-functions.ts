import { generateJwtToken } from "../auth/auth-utils";

export function generateTokenWithUserId(userId: string) {
  const { access_token, durationInSeconds } = generateJwtToken({ id: userId });
  return { access_token, durationInSeconds };
}
