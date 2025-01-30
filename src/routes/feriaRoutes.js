import express from 'express';

import {
    newFeriaController,
    userFeriaListController,
} from '../controllers/ferias/index.js';

import authUserController from '../middlewares/authUserController.js';
import authAdminController from '../middlewares/authAdminController.js';

const router = express.Router();

// Controlador que permite crear una feria
router.post(
    '/ferias/create',
    authUserController,
    authAdminController,
    newFeriaController,
);

// Controlador que devuelve la lista de ferias de un usuario por ID.
router.get('/ferias/list', authUserController, userFeriaListController);

export default router;
