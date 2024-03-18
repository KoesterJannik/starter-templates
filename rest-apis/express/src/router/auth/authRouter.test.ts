import "dotenv/config";
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app";
import { generateRandomString } from "../../../test-utils";
import jwt from "jsonwebtoken";

// test the hello world route
describe("GET /", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
  it("should try to register a user but wihout an email", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      password: "password123",
    });
    expect(response.status).toBe(400);
  });
  it("should try to register a user but wihout a password", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "dfsd@web.de",
      password: "",
    });
    expect(response.status).toBe(400);
  });
  let randomEmail = generateRandomString(10) + "@web.de";
  let randomPassword = generateRandomString(10);
  it("should successfully create a new user", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: randomEmail,
      password: randomPassword,
    });
    expect(response.status).toBe(201);
    // expect to receive an object with access_token and durationInSeconds
    expect(response.body.access_token).toBeTruthy();
    expect(response.body.durationInSeconds).toBeTruthy();
  });
  it("tries to register the same user again but fails", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: randomEmail,
      password: randomPassword,
    });
    expect(response.status).toBe(400);
  });
  it("tries to login with the new user", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: randomEmail,
      password: randomPassword,
    });
    expect(response.status).toBe(200);
    // expect to receive an object with access_token and durationInSeconds
    expect(response.body.access_token).toBeTruthy();
    expect(response.body.durationInSeconds).toBeTruthy();

    const res = (await request(app)
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${response.body.access_token}`)) as any;
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(randomEmail);
  });
  it("tries to login with the wrong password", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: randomEmail,
      password: "wrongpassword",
    });
    expect(response.status).toBe(401);
  });
  it("should try to get profile information without a token", async () => {
    const response = await request(app).get("/api/v1/auth/profile");
    expect(response.status).toBe(401);
  });
  it("should try to get profile information with an invalid token", async () => {
    const response = await request(app)
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer invalidtoken`);
    expect(response.status).toBe(401);
  });
  it("should try to get the profile with an malicous token", async () => {
    const mal_token = jwt.sign({}, "SECRET THAT COMES NOT FROM THE SERVER", {
      expiresIn: "60s",
    });
    const response = await request(app)
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${mal_token}`);
    expect(response.status).toBe(401);
  });
});
