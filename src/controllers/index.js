// Importamos las funciones controladoras
import newUserController from './newUserController.js';
import loginUserController from './loginUserController.js';
import activateUserController from './activateUserController.js';
import getUserProfileController from './getUserProfileController.js';
import userAvatarController from './userAvatarController.js';

// Las exportamos para que userRoutes pueda acceder a ellas.
export {
    newUserController,
    loginUserController,
    activateUserController,
    getUserProfileController,
    userAvatarController,
};
