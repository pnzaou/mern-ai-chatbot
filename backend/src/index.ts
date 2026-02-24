import express from "express";
import { Request, Response, NextFunction } from "express"

const app = express()

app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({message: "Hello API!", error: false});
})

app.listen(5000, () => {
    console.log("Server Open");
})