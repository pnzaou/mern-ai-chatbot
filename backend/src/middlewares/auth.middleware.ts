import { NextFunction, Request, Response } from "express";
import { COOKIE_NAME } from "../utils/constantes.js";
import jwt from "jsonwebtoken";

interface decodeDataType {
    id: string;
    iat: number;
    exp: number;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if(!token || token.trim() === "") {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET) as decodeDataType;
        req.userId = decode.id;
        return next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
}

export default verifyToken;