import getPool from '../../db/getPool.js';

import removePhotoUtil from '../../utils/removePhotoUtil.js';

const deleteProductController = async (req, res, next) => {
    try {
        // Obtenemos el ID del producto a eliminar.
        const { productId } = req.params;

        // Hacemos conexion a la base de datos.
        const pool = await getPool();

        // Localizamos las fotos vinculadas con la base de datos.
        const [photos] = await pool.query(
            `
            SELECT name FROM productphotos WHERE productId = ?
            `,
            [productId],
        );

        // Si hay alguna foto las eliminamos del disco.
        for (const photo of photos) {
            await removePhotoUtil(photo.name);
        }

        // Eliminamos las fotos de la base de datos.
        await pool.query('DELETE FROM productphotos WHERE productId = ?', [
            productId,
        ]);

        // Eliminamos el producto de la BD.
        await pool.query(`DELETE FROM products WHERE id = ?`, [productId]);

        // Enviamos una respuesta al cliente
        res.send({
            status: 'ok',
            message: 'Producto Eliminado',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteProductController;
