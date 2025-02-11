import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

const productListController = async (req, res, next) => {
    try {
        // Obtenemos la conexión a la base de datos
        const pool = await getPool();

        // Obtenemos los productos
        const [products] = await pool.query(
            `
            SELECT 
                p.id,
                p.name,
                p.type,
                p.description,
                p.sellingType,
                p.cost,
                p.price,
                p.stock
            FROM products p 
            LEFT JOIN productphotos pp ON p.id = pp.productId
            GROUP BY p.id
            `,
        );

        // Si no hay ningun producto lanzamos un error
        if (products.length < 1) {
            generateErrorUtil('No hay productos en este momento', 401);
        }

        // Si hay entradas buscamos las fotos de cada entrada.
        for (const product of products) {
            // Buscamos las fotos de la entrada actual.
            const [photos] = await pool.query(
                `SELECT id, name FROM productphotos WHERE productId = ?`,
                [product.id],
            );

            // Agregamos el array de fotos a la entrada actual.
            product.photos = photos;
        }

        // Enviamos la respuesta
        res.send({
            status: 'ok',
            products: products,
        });
    } catch (err) {
        next(err);
    }
};

export default productListController;
