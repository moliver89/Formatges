import express from 'express';

import newFeriaController from '../controllers/ferias/index.js';

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

export default router;
