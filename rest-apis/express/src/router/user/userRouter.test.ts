import "dotenv/config";
import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../../app";
import { generateRandomString } from "../../../test-utils";

describe("PATCH /api/v1/users/change-password", () => {
  let randomEmail = generateRandomString(10) + "@web.de";
  let randomPassword = generateRandomString(10);
  let token: string;

  beforeAll(async () => {
    // Register a new user
    const response = await request(app).post("/api/v1/auth/register").send({
      email: randomEmail,
      password: randomPassword,
    });
    token = response.body.access_token;
  });

  it("should try to change password without a token", async () => {
    const response = await request(app)
      .patch("/api/v1/users/change-password")
      .send({ oldPassword: randomPassword, newPassword: "newPassword123" });
    expect(response.status).toBe(401);
  });

  it("should try to change password with an invalid token", async () => {
    const response = await request(app)
      .patch("/api/v1/users/change-password")
      .set("Authorization", `Bearer invalidtoken`)
      .send({ oldPassword: randomPassword, newPassword: "newPassword123" });
    expect(response.status).toBe(401);
  });

  it("should try to change password with an incorrect old password", async () => {
    const response = await request(app)
      .patch("/api/v1/users/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({ oldPassword: "wrongPassword", newPassword: "newPassword123" });
    expect(response.status).toBe(401);
  });

  it("should successfully change password", async () => {
    const response = await request(app)
      .patch("/api/v1/users/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({ oldPassword: randomPassword, newPassword: "newPassword123" });
    expect(response.status).toBe(200);
  });
});
