import { body } from "express-validator";

export const signupValidator = [
  body("name").notEmpty().withMessage("Le nom est obligatoire"),
  body("email")
    .trim()
    .isEmail()
    .notEmpty()
    .withMessage("L'email est obligatoire et doit être valide."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];
