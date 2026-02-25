import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt, {hash} from "bcryptjs";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constantes.js";

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

        res.clearCookie(COOKIE_NAME, {
          path: "/",
          domain: "localhost",
          httpOnly: true,
          signed: true,
        });

        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        const token = createToken(user._id.toString(), "7d");

        res.cookie(COOKIE_NAME, token, {
          path: "/",
          domain: "localhost",
          httpOnly: true,
          signed: true,
          expires
        })

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

export const userLogin = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
    if(!email.trim() || !email || !password.trim() || !password) {
      return res.status(422).json({message: "Tous les champs sont obligatoires."});
    }

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(401).json({message: "Email ou mot de passe incorrect."});
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) {
      return res.status(401).json({message: "Email ou mot de passe incorrect."});
    }

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true, 
      signed: true
    });

    const token = createToken(user._id.toString(), "7d")

    const expires = new Date()
    expires.setDate(expires.getDate() + 7)

    res.cookie(COOKIE_NAME, token, {
      path: "/",           // Cookie accessible sur toutes les routes du site
      domain: "localhost", // Domaine pour lequel le cookie est valide
      expires,             // Date exacte d’expiration du cookie
      httpOnly: true,      // Empêche l’accès au cookie via JavaScript (sécurité XSS)
      signed: true         // Signe le cookie avec le secret défini dans cookie-parser
    })

    return res.status(200).json({message: "Connexion réussie."})
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
