import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

const userFeriaListController = async (req, res, next) => {
    try {
        // Obtenemos el ID del usuario
        const userId = req.user.id;

        // Llamamos a la Base de Datos
        const pool = await getPool();

        // Buscamos las ferias con ese userId.
        const [ferias] = await pool.query(
            `
            SELECT * FROM ferias WHERE userId = ?
            `,
            [userId],
        );

        // Verificamos que existan ferias
        if (ferias.length < 1) {
            generateErrorUtil('Este usuario no tiene ferias', 400);
        }

        res.status(200).send({
            status: 'ok',
            message: 'Listado de ferias',
            data: {
                ferias,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default userFeriaListController;
