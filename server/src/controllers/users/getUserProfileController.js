import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

const getUserProfileController = async (req, res, next) => {
    try {
        // Obtenemos el ID del usuario del Token.
        const userId = req.user.id;

        // Obtenemos la conexión con la base de datos.
        const pool = await getPool();

        const [user] = await pool.query(
            `
            SELECT id, email, username, name, lastName, avatar, role FROM users WHERE id = ? 
            `,
            [userId],
        );

        // Si no existe ningún usuario lanzamos un error.
        if (user.length < 1) {
            generateErrorUtil('Usuario no encontrado', 404);
        }

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            data: {
                user: user[0],
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getUserProfileController;
