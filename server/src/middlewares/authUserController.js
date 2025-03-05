import jwt from 'jsonwebtoken';

import generateErrorUtil from '../utils/generateErrorUtil.js';

const authUserController = async (req, res, next) => {
    try {
        // Obtenemos el token de la cabecera de Authorization.
        const { authorization } = req.headers;

        // Si falta el token lanzamos un error.

        if (!authorization) {
            generateErrorUtil('Falta la cabecera de autorización', 401);
        }

        try {
            // Desencriptamos el token.
            const tokenInfo = jwt.verify(authorization, process.env.SECRET);

            // Añadimos al objeto request una propiedad inventada por nosotros para
            // almacenar la info del usuario.
            req.user = tokenInfo;

            // Pasamos el control al siguiente middleware. Esto hará que el siguiente
            // middleware tenga acceso a "req.user.id" y "req.user.role".
            next();
        } catch (err) {
            console.error(err);

            generateErrorUtil('Token inválido', 401);
        }
    } catch (err) {
        next(err);
    }
};

export default authUserController;
