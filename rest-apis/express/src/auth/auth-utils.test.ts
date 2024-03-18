import "dotenv/config";
import { describe, it, expect } from "vitest";
import {
  hashPassword,
  verifyJwtToken,
  comparePasswords,
  generateJwtToken,
} from "./auth-utils";

describe("auth-utils", () => {
  it("hashPassword should return a hashed password", async () => {
    const password = "password123";
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).not.toBe(password);
  });

  it("comparePasswords should return true for correct password", async () => {
    const password = "password123";
    const hashedPassword = await hashPassword(password);
    const isMatch = await comparePasswords(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it("generateJwtToken should return a token", async () => {
    const payload = { id: "123" };
    const token = await generateJwtToken(payload);
    expect(token).toBeTruthy();
  });

  it("verifyJwtToken should return payload for valid token", async () => {
    const payload = { id: "123" };
    const { access_token } = await generateJwtToken(payload);
    const verifiedPayload = await verifyJwtToken(access_token);
    expect(verifiedPayload.id).toBe(payload.id);
  });
});
