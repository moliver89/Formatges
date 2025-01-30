import getPool from '../../db/getPool.js';
import bcrypt from 'bcrypt'; // Dependencia para comparar las contraseñas encriptadas.
import jwt from 'jsonwebtoken'; // Dependecia para generar tokens JWT
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const loginUserController = async (req, res, next) => {
    try {
        // Extraemos los datos del cuerpo de la petición
        const { email, password } = req.body;

        // Verificamos que no falten campos
        if (!email || !password) {
            generateErrorUtil('Faltan campos', 400);
        }
        // Obtenemos la conexión a la DB
        const pool = await getPool();

        // Buscamos al usuario en la base de datos por su email
        const [user] = await pool.query(
            `
            SELECT * FROM users WHERE email = ?
            `,
            [email],
        );

        // Verificamos si el usuario existe y si la contraseña es correcta
        const validPass =
            user.length > 0 &&
            (await bcrypt.compare(password, user[0].password));

        // Si la contraseña no es válida, generamos un error
        if (!validPass) {
            generateErrorUtil('Credenciales incorrectas', 401);
        }

        // Verificamos si el usuario está activo
        if (!user[0].active) {
            generateErrorUtil('Usuario no activo', 401);
        }

        // Preparamos la información para el token
        const tokenInfo = {
            id: user[0].id,
            role: user[0].role,
        };

        // Generamos el token JWT
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '21d',
        });

        // Enviamos la respuesta con el token
        res.send({
            status: 'ok',
            data: { token },
        });
    } catch (err) {
        // Si ocurre algún error, lo pasamos al siguiente middleware
        next(err);
    }
};

export default loginUserController;
