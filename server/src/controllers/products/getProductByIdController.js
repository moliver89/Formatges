import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

const getProductByIdController = async (req, res, next) => {
    try {
        //Obtenemos el ID de la feria a editar
        const { productId } = req.params;

        // Hacemos la llamada a la base de datos.
        const pool = await getPool();

        // Buscamos la feria con ese ID.
        const [product] = await pool.query(
            `SELECT * FROM products WHERE id = ?`,
            [productId],
        );

        // Si no existe ninguna oficina con ese ID, generamos un error.
        if (product.length < 1) {
            throw generateErrorUtil('No existe ese producto', 404);
        }

        // Buscamos las fotos de la entrada actual.
        const [photos] = await pool.query(
            `SELECT id, name FROM productphotos WHERE productId = ?`,
            [product[0].id],
        );

        // Agregamos el array de fotos a la entrada actual.
        product[0].photos = photos;

        res.send({
            status: 'ok',
            data: {
                product: product,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getProductByIdController;
