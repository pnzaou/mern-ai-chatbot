import app from "./app.js";
import { Request, Response, NextFunction } from "express"
import { connectToDataBase } from "./db/connection.js";

const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({message: "Hello API!", error: false});
})

connectToDataBase()
  .then(() =>
    app.listen(PORT, () => {
      console.log("Server Open & Connected To DataBase");
    }),
  )
  .catch((error) => {
    console.log(error);
  });