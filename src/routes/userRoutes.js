import express from 'express';

import {
    newUserController,
    loginUserController,
    activateUserController,
    getUserProfileController,
} from '../controllers/index.js';
import authUserController from '../middlewares/authUserController.js';

const router = express.Router();

//Controlador que permite registrar un usuario.
router.post('/users/register', newUserController);

//Controlador que activa un usuario con el codigo de registro
router.patch('/users/activate/:registrationCode', activateUserController);

//Controlador que permite a un usuario loguearse.
router.post('/users/login', loginUserController);

//Controlador que devuelve los datos de perfil del usuario.
router.get('/users/profile/', authUserController, getUserProfileController);

export default router;
