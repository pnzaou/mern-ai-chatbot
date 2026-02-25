import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .notEmpty()
    .withMessage("Un email valide est obligatoire."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];

export const signupValidator = [
  body("name").notEmpty().withMessage("Le nom est obligatoire"),
  ...loginValidator
];
