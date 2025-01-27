// Importamos las funciones controladoras
import newUserController from './newUserController.js';
import loginUserController from './loginUserController.js';
import activateUserController from './activateUserController.js';
import getUserProfileController from './getUserProfileController.js';

// Las exportamos para que userRoutes pueda acceder a ellas.
export {
    newUserController,
    loginUserController,
    activateUserController,
    getUserProfileController,
};
