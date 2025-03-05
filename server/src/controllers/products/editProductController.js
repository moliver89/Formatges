import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

import sellingTypeUtil from '../../utils/sellingTypeUtil.js';

const editProductController = async (req, res, next) => {
    try {
        //Obtenemos el ID de la feria a editar
        const { productId } = req.params;

        // Extraemos los datos del cuerpo de la petición.
        const { name, type, description, sellingType, cost, price, stock } =
            req.body;

        // Verificamos que no falten campos.
        if (
            !name &&
            !type &&
            !description &&
            !sellingType &&
            !cost &&
            !price &&
            !stock
        ) {
            generateErrorUtil('No ingresaste ningun cambio.', 400);
        }

        // Obtenemos la conexion a la base de datos.
        const pool = await getPool();

        const [product] = await pool.query(
            `
            SELECT * FROM products WHERE id = ?
            `,
            [productId],
        );

        // Si la feria  no existe lanzamos un error.
        if (product[0].length < 1) {
            generateErrorUtil('No existe un producto con ese ID', 404);
        }

        // Si el Admin ha enviado un nombre lo actualizamos.
        if (name) {
            await pool.query(`UPDATE products SET name = ? WHERE id = ?`, [
                name,
                productId,
            ]);
        }

        // Si el Admin ha enviado un tipo de producto lo actualizamos.
        if (type) {
            await pool.query(`UPDATE products SET type = ? WHERE id = ?`, [
                type,
                productId,
            ]);
        }

        // Si el Admin ha enviado un nombre lo actualizamos.
        if (description) {
            await pool.query(
                `UPDATE products SET description = ? WHERE id = ?`,
                [description, productId],
            );
        }

        // Si el Admin ha enviado un nombre lo actualizamos.
        if (sellingType) {
            await pool.query(
                `UPDATE products SET sellingType = ? WHERE id = ?`,
                [sellingType, productId],
            );
        }

        // Si el Admin ha enviado un nombre lo actualizamos.
        if (cost) {
            await pool.query(`UPDATE products SET cost = ? WHERE id = ?`, [
                cost,
                productId,
            ]);
        }

        // Si el Admin ha enviado un nombre lo actualizamos.
        if (price) {
            await pool.query(`UPDATE products SET price = ? WHERE id = ?`, [
                price,
                productId,
            ]);
        }

        // Si el Admin ha enviado un nombre lo actualizamos.
        if (stock) {
            // Verificamos que el stock este bien ingresado(Si es de tipo pieza debe ser multiplo de 0,25).
            if (!sellingTypeUtil(stock, product[0].sellingType)) {
                generateErrorUtil(
                    'El stock ingresado no es válido para el tipo de venta.',
                    400,
                );
            }

            await pool.query(`UPDATE products SET stock = ? WHERE id = ?`, [
                stock,
                productId,
            ]);
        }
        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Producto actualizado',
            data: {
                product: {
                    name,
                    type,
                    description,
                    sellingType,
                    cost,
                    price,
                    stock,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editProductController;
