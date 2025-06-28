import { Router } from "express";
const userRoutes = Router();
import { forgetPasswordController, loginController , registerController, resetPasswordController} from "../controllers/user.controller.js";

userRoutes.post('/register',registerController);
userRoutes.post("/login",loginController)
userRoutes.post('/forget',forgetPasswordController);
userRoutes.post('/reset-password',resetPasswordController)

export default userRoutes;