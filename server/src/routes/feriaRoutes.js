import express from 'express';

import {
    newFeriaController,
    userFeriaListController,
    editFeriaController,
    getFeriaByIdController,
} from '../controllers/ferias/index.js';

import authUserController from '../middlewares/authUserController.js';
import authAdminController from '../middlewares/authAdminController.js';

const router = express.Router();

// Controlador que permite crear una feria. Solo por Admin.
router.post(
    '/ferias/create',
    authUserController,
    authAdminController,
    newFeriaController,
);

// Controlador que permite editar una feria. Solo por Admin.
router.put(
    '/ferias/edit/:feriaId',
    authUserController,
    authAdminController,
    editFeriaController,
);

// Controlador que devuelve la lista de ferias de un usuario por ID.
router.get('/ferias/list', authUserController, userFeriaListController);

// Controlador que devuelve una feria en concreto por Id. Lo pueden ver el usuario asignado a esa feria y el admin.
router.get('/ferias/:feriaId', authUserController, getFeriaByIdController);

export default router;
