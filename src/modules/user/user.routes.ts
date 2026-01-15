import { Hono } from "hono";
import { requestValidator } from "../../middlewares/requestValidator.middleware";
import { RegisterUserRequest } from "../../types/requests/auth/auth.request";
import { UserController } from "./user.controller";

const userRouter = new Hono();

userRouter.post(
  "/register",
  requestValidator(RegisterUserRequest),
  UserController.registerUser,
);

export default userRouter;
