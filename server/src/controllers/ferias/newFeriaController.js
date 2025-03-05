import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

const newFeriaController = async (req, res, next) => {
    try {
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

        //Verificamos que no falten campos
        if (
            !name ||
            !year ||
            !type ||
            !montaje ||
            !opening ||
            !closing ||
            !price ||
            !organizador ||
            !userId
        ) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Verificamos que el horario de apertura y cierre este bien.
        if (opening >= closing) {
            throw generateErrorUtil(
                'El horario de cierre tiene que ser posterior al de apertura',
                400,
            );
        }

        // Verificamos que el horario de montaje este bien.
        if (montaje >= opening) {
            throw generateErrorUtil(
                'El horario de montaje tiene que ser anterior al de apertura',
                400,
            );
        }

        //Hacemos una llamada a la base de datos
        const pool = await getPool();

        const [feria] = await pool.query(
            `
            SELECT * FROM ferias WHERE name = ? AND year = ?
            `,
            [name, year],
        );

        // Si ya existe una feria lanzamos un error
        if (feria.length > 0) {
            generateErrorUtil('La feria ya existe', 400);
        }

        // Insertamos la feria en la tabla
        await pool.query(
            `
            INSERT INTO ferias (name, year, type, montaje, opening, closing, price,organizador, userId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                name,
                year,
                type,
                montaje,
                opening,
                closing,
                price,
                organizador,
                userId,
            ],
        );

        // Establecemos el codigo 20 y enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Feria creada con exito',
        });
    } catch (err) {
        next(err);
    }
};

export default newFeriaController;
