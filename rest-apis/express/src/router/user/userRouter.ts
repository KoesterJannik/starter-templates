import { Router } from "express";
import { changeUsersPassword } from "./handlers";
import { isAuthenticated } from "../../auth/middleware";

const userRouter = Router();
userRouter.use(isAuthenticated);

userRouter.patch("/change-password", changeUsersPassword);

export default userRouter;
