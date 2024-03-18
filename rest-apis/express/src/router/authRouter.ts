import { Router } from "express";
import { getProfile, loginUser, registerUser } from "./handlers";
import { isAuthenticated } from "../auth/middleware";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.use(isAuthenticated);
authRouter.get("/profile", getProfile);

export default authRouter;
