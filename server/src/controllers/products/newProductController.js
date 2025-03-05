import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sellingTypeUtil from '../../utils/sellingTypeUtil.js';
import savePhotoUtil from '../../utils/savePhotoUtil.js';

const newProductController = async (req, res, next) => {
    try {
        // Extraemos los datos del cuerpo de la petición.
        const { name, type, description, sellingType, cost, price, stock } =
            req.body;

        // Obtenemos la imagen del producto.
        const photo1 = req.files?.photo1;

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

        // Si ya existe una producto lanzamos un error
        if (product.length > 0) {
            generateErrorUtil('Ya existe un producto con ese nombre', 400);
        }

        // Insertamos el producto en la tabla
        const [newProduct] = await pool.query(
            `
            INSERT INTO products (name, type, description, sellingType, cost, price, stock)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [name, type, description, sellingType, cost, price, stock],
        );

        // Creamos un array con los valores del objeto "files". Esto nos permitirá crear un array con
        // las fotos recibidas del cliente. Utilizamos el "slice" para evitar que nos puedan llegar más
        // de tres fotos dado que es el límite que hemos establecido para cada entrada.
        const photosArr = Object.values(req.files).slice(0, 3);

        // Recorremos el array de fotos para almacenar las fotos en disco y guardarlas en la base de datos.
        for (const photo of photosArr) {
            // Guardamos la foto en la carpeta de subida de archivos.
            const photoName = await savePhotoUtil(photo, 1000);

            // Guardamos la foto en la base de datos.
            await pool.query(
                `INSERT INTO productphotos(name, productId) VALUES(?, ?)`,
                [photoName, newProduct.insertId],
            );
        }

        // Establecemos el codigo 201 y enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Producto creado con exito',
        });
    } catch (err) {
        next(err);
    }
};

export default newProductController;
