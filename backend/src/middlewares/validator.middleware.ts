import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

/**
 * Middleware générique de validation
 * @param validations - tableau de règles express-validator
 */
const validate = (validations: ValidationChain[]) => {

    // On retourne un middleware Express
    return async (req: Request, res: Response, next: NextFunction) => {

        // Exécute chaque validation une par une
        for (const validation of validations) {
            console.log("TEEEEEEST")
            const result = await validation.run(req);

            // Si une validation échoue, on arrête la boucle
            if (!result.isEmpty()) {
                break;
            }
        }

        // Récupère toutes les erreurs de validation
        const errors = validationResult(req);

        // Si aucune erreur → on passe au middleware suivant
        if (errors.isEmpty()) {
            return next();
        }

        // Sinon → on renvoie les erreurs au client
        return res.status(422).json({
            errors: errors.array()
        });
    };
};

export default validate;