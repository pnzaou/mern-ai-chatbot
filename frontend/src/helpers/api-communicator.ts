import { axiosInstance } from "../libs/axios"

export const loginUser = async (email: string, password: string) => {
    const res = await axiosInstance.post("/user/login", { email, password });
    if(res.status !== 200) {
        if(res.status === 401) {
            throw new Error("Email ou mot de passe incorrect!");
        }
        throw new Error("Erreur lors de la connexion");
    }
    const data = res.data;
    return data;
}