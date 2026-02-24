import { connect } from "mongoose";

export async function connectToDataBase() {
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
        throw new Error("Erreur de connexion à MongoDB")
    }
}