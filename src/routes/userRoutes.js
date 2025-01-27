import express from 'express';

import newUserController from '../controllers/index.js';

const router = express.Router();

//Controlador que permite registrar un usuario.
router.post('/users/register', newUserController);

export default router;
