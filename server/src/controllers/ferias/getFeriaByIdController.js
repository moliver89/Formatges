import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

const getFeriaByIdController = async (req, res, next) => {
    try {
        //Obtenemos el ID de la feria a editar
        const { feriaId } = req.params;

        // Hacemos la llamada a la base de datos.
        const pool = await getPool();

        // Buscamos la feria con ese ID.
        const [feria] = await pool.query(`SELECT * FROM ferias WHERE id = ?`, [
            feriaId,
        ]);

        // Si no existe ninguna oficina con ese ID, generamos un error.
        if (feria.length < 1) {
            throw generateErrorUtil('No existe esa feria', 404);
        }

        if (req.user.role !== 'ADMIN' && req.user.id !== feria[0].userId) {
            generateErrorUtil('No tienes los permisos necesarios', 403);
        }

        res.send({
            status: 'ok',
            data: {
                feria: feria[0],
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getFeriaByIdController;
