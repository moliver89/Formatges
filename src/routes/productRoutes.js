import express from 'express';

// Importamos las funciones controladoras.
import {
    newProductController,
    editProductController,
    productListController,
    getProductByIdController,
} from '../controllers/products/index.js';

// Importamos los middleware de autorización.
import authUserController from '../middlewares/authUserController.js';
import authAdminController from '../middlewares/authAdminController.js';

const router = express.Router();

// Controlador que permite crear un producto. Solo por el admin.
router.post(
    '/products/create',
    authUserController,
    authAdminController,
    newProductController,
);

// Controlador que permite editar un producto.
router.put(
    '/products/edit/:productId',
    authUserController,
    authAdminController,
    editProductController,
);

// Controlador que devuelve la lista de productos.
router.get('/products/list', productListController);

// Controlador que devuelve un producto por ID.
router.get('/products/:productId', getProductByIdController);

export default router;
