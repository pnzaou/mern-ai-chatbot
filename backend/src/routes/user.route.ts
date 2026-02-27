import { Router } from "express";
import { getAllUsers, getAuthUser, userLogin, userSignup } from "../controllers/user.controller.js";
import validate from "../middlewares/validator.middleware.js";
import { loginValidator, signupValidator } from "../utils/validators.js";
import verifyToken from "../middlewares/auth.middleware.js";

const userRoutes = Router()

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, getAuthUser);

export default userRoutes;