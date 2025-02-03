import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

const editFeriaController = async (req, res, next) => {
    try {
        //Obtenemos el ID de la feria a editar
        const { feriaId } = req.params;

        // Obtenemos los datos del body.
        const {
            name,
            year,
            type,
            montaje,
            opening,
            closing,
            price,
            organizador,
            userId,
        } = req.body;

        //Verificamos que se haya enviado aunque sea un dato
        if (
            !name &&
            !year &&
            !type &&
            !montaje &&
            !opening &&
            !closing &&
            !price &&
            !organizador &&
            !userId
        ) {
            generateErrorUtil('No has ingresado ningun cambio.', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        const [feria] = await pool.query(`SELECT * FROM ferias WHERE id = ?`, [
            feriaId,
        ]);
        console.log(feria);
        // Si la feria  no existe lanzamos un error.
        if (feria[0].length < 1) {
            generateErrorUtil('No existe una feria con ese ID', 404);
        }

        // Si el Admin ha enviado un nombre lo actualizamos.
        if (name) {
            await pool.query(`UPDATE ferias SET name = ? WHERE id = ?`, [
                name,
                feriaId,
            ]);
        }

        // Si el Admin ha enviado un año lo actualizamos.
        if (year) {
            await pool.query(`UPDATE ferias SET year = ? WHERE id = ?`, [
                year,
                feriaId,
            ]);
        }

        // Si el Admin ha enviado un tipo lo actualizamos.
        if (type) {
            await pool.query(`UPDATE ferias SET type = ? WHERE id = ?`, [
                type,
                feriaId,
            ]);
        }

        // Si el Admin ha enviado un horario de montaje lo actualizamos.
        if (montaje) {
            await pool.query(`UPDATE ferias SET montaje = ? WHERE id = ?`, [
                montaje,
                feriaId,
            ]);
        }

        // Si el Admin ha enviado un horario de apertura lo actualizamos.
        if (opening) {
            await pool.query(`UPDATE ferias SET opening = ? WHERE id = ?`, [
                opening,
                feriaId,
            ]);
        }

        // Si el Admin ha enviado un nombre lo actualizamos.
        if (closing) {
            await pool.query(`UPDATE ferias SET closing = ? WHERE id = ?`, [
                closing,
                feriaId,
            ]);
        }

        // Si el Admin ha enviado un precio lo actualizamos.
        if (price) {
            await pool.query(`UPDATE ferias SET price = ? WHERE id = ?`, [
                price,
                feriaId,
            ]);
        }

        // Si el Admin ha enviado un organizador lo actualizamos.
        if (organizador) {
            await pool.query(`UPDATE ferias SET organizador = ? WHERE id = ?`, [
                organizador,
                feriaId,
            ]);
        }

        // Si el Admin ha enviado un usuario lo actualizamos.
        if (userId) {
            await pool.query(`UPDATE ferias SET userId = ? WHERE id = ?`, [
                userId,
                feriaId,
            ]);
        }

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Oficina actualizada',
            data: {
                office: {
                    name,
                    year,
                    type,
                    montaje,
                    opening,
                    closing,
                    price,
                    organizador,
                    userId,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editFeriaController;
