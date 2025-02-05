import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sellingTypeUtil from '../../utils/sellingTypeUtil.js';

const newProductController = async (req, res, next) => {
    try {
        // Extraemos los datos del cuerpo de la petición.
        const { name, type, description, sellingType, cost, price, stock } =
            req.body;

        // Verificamos que no falten campos.
        if (!name || !type || !sellingType || !cost || !price || !stock) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Verificamos que el stock este bien ingresado(Si es de tipo pieza debe ser multiplo de 0,25).
        if (!sellingTypeUtil(stock, sellingType)) {
            generateErrorUtil(
                'El stock ingresado no es válido para el tipo de venta.',
                400,
            );
        }

        // Obtenemos la conexion a la base de datos.
        const pool = await getPool();

        const [product] = await pool.query(
            `
            SELECT * FROM products WHERE name = ?
            `,
            [name],
        );

        // Si ya existe una feria lanzamos un error
        if (product.length > 0) {
            generateErrorUtil('Ya existe un producto con ese nombre', 400);
        }

        // Insertamos la feria en la tabla
        await pool.query(
            `
            INSERT INTO products (name, type, description, sellingType, cost, price, stock)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [name, type, description, sellingType, cost, price, stock],
        );

        // Establecemos el codigo 20 y enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Producto creado con exito',
        });
    } catch (err) {
        next(err);
    }
};

export default newProductController;
