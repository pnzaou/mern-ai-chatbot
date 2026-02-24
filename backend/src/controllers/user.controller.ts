import { Request, Response } from "express";
import User from "../models/user.model.js";
import {hash} from "bcryptjs";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, {password: 0});

    return res
      .status(200)
      .json({ message: "Users récupéré avec succès", users });

  } catch (error) {
    console.log("User GET /api/user", error);

    return res
      .status(500)
      .json({
        message: "Erreur lors de la récupération",
        cause: error.message,
      });
  }
};

export const userSignup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !name.trim() || !email || !email.trim() || !password || !password.trim()) {
            return res.status(422).json({message: "Tous les champs sont obligatoires."})
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(409).json({message: "Cet email est déjà utilisé."})
        }

        const hashedPassword = await hash(password.trim(), 12);

        const user = new User({
            name: name.trim(),
            email: email.trim(),
            password: hashedPassword
        })

        await user.save();

        return res.status(201).json({
            message: "Inscription réussie.",
            user: {
                id: user._id.toString(),
                name: user.name
            }
        })
    } catch (error) {
        console.log("User POST /api/signup", error);

    return res
      .status(500)
      .json({
        message: "Erreur lors de l'inscription'",
        cause: error.message,
      });
    }
}
