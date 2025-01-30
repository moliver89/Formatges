import getPool from '../../db/getPool.js';

// Importamos la funcion que guarda una foto en disco
import savePhotoUtil from '../../utils/savePhotoUtil.js';
import removePhotoUtil from '../../utils/removePhotoUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const userAvatarController = async (req, res, next) => {
    try {
        // Obtenemos la imagen. Preguntamos si hay archivo. Si lo hay le asigna avatar.
        const avatar = req.files?.avatar;

        // Lanzamos un error si falta algún campo.
        if (!avatar) {
            generateErrorUtil('Faltan campos');
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos los datos del usuario para comprobar si existe un avatar previo.
        const [users] = await pool.query(
            `SELECT avatar FROM users WHERE id = ?`,
            [req.user.id],
        );

        // Lanzamos un error si el usuario no existe.
        if (users.length < 1) {
            generateErrorUtil('Usuario no encontrado', 404);
        }

        // Si el usuario ya tenía un avatar previo lo eliminamos.
        if (users[0].avatar) {
            await removePhotoUtil(users[0].avatar);
        }

        //Guardamos la foto en la carpeta uploads y obtenemos el nombre de la misma
        const avatarName = await savePhotoUtil(avatar, 100);

        // Actualizamos los datos del usuario.
        await pool.query(`UPDATE users SET avatar = ? WHERE id = ?`, [
            avatarName,
            req.user.id,
        ]);

        res.status(201).send({
            status: 'ok',
            message: 'Avatar actualizado',
            data: {
                avatarName,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default userAvatarController;
