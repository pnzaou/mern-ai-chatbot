import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user.controller.js";
import validate from "../middlewares/validator.middleware.js";
import { loginValidator, signupValidator } from "../utils/validators.js";

const userRoutes = Router()

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);

export default userRoutes;