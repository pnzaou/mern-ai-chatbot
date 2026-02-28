import { Request, Response } from "express";
import User from "../models/user.model.js"
import configureOpenAi from "../config/openai-config.js";
import { ChatCompletionMessageParam } from "openai/resources";

export const generateChatCompletion = async ( req: Request, res: Response ) => {
  try {
    const { message } = req.body;
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({message: "User not found"});
    }

    //récupérer tous les chats de l'utilisateur
    const chats = user.chats.map(({role, content}) => ({ content, role })) as ChatCompletionMessageParam[];
    // on y ajoute le nouveau message
    chats.push({content: message, role: "user"});
    user.chats.push({ content: message, role: "user" });

    //on envoie tous les chats y compris le nouveau à l'API openAI
    const client = configureOpenAi();

    //METHODE1 (VEILLE) AVEC chat.completions.create
    const response1 = await client.chat.completions.create({
        model: 'gpt-5.2',
        messages: chats
    })

    //METHODE2 (NOUVELLE) AVEC responses.create
    // const response2 = await client.responses.create({
    //     model: "gpt-5.2",
    //     input: chats
    // })

    user.chats.push(response1.choices[0].message);
    await user.save();

    return res.status(200).json({message: "OK", chats: user.chats});
  } catch (error) {
    console.log("User GET /api/chat/new", error);

    return res
      .status(500)
      .json({
        message: "Une erreur est survenue.",
        cause: error.message,
    });
  }
};

//3:52:02
