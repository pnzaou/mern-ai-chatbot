import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user.controller.js";
import validate from "../middlewares/validator.middleware.js";
import { signupValidator } from "../utils/validators.js";

const userRoutes = Router()

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);

export default userRoutes;