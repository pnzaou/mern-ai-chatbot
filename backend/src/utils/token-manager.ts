import jwt, { SignOptions } from "jsonwebtoken"

// Crée un token JWT avec un id et une durée d'expiration
export const createToken = (
  id: string,
  expiresIn: SignOptions["expiresIn"] // Type exact attendu par jsonwebtoken
) => {

  const payload = { id } // Données stockées dans le token

  // Vérifie que la clé secrète existe
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  // Génère le token signé avec la clé secrète
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn
  });

  return token;
}