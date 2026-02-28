import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validator.middleware.js";
import { chatMessageValidator } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chat.controller.js";

const chatRoutes = Router();
chatRoutes.post("/new", verifyToken, validate(chatMessageValidator), generateChatCompletion)

export default chatRoutes;