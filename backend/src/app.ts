import express from "express";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import appRouter from "./routes/index.js";

config();
const app = express()

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", appRouter)

export default app;