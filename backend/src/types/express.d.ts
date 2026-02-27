import { JwtPayload } from "jsonwebtoken";


// declare global permet de modifier ou étendre des types globaux existants
// Ici on ne crée PAS un nouveau type, on modifie un type déjà défini
declare global {

  // Express définit ses types dans un namespace appelé "Express"
  // On rentre dedans pour modifier son interface Request
  namespace Express {

    // On étend l’interface Request existante
    // Cela va fusionner avec la définition originale (declaration merging)
    interface Request {

      // On ajoute une nouvelle propriété "user" à l’objet req
      // Le "?" signifie que la propriété est optionnelle
      // (elle n’existe pas avant le middleware d’authentification)

      // Le type peut être :
      // - string (car jwt.verify peut retourner une string)
      // - JwtPayload (objet contenant les données du token)
      userId?: string;
    }
  }
}