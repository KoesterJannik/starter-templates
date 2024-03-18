import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import authRouter from "./router/auth/authRouter";
import userRouter from "./router/user/userRouter";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack); // Log error stack trace to the console

  res.status(err.status || 500).json({
    message: err.message || "An unexpected error occurred",
    // Include stack trace in response if not in production environment
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
const API_PREFIX = "/api/v1";

app.use(`${API_PREFIX}/auth`, authRouter);

app.use(`${API_PREFIX}/users`, userRouter);

app.use(errorHandler);

export default app;
