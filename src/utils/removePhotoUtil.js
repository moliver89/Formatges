import path from 'path';
import fs from 'fs/promises';

import generateErrorUtil from './generateErrorUtil.js';

const removePhotoUtil = async (imgName) => {
    try {
        // Generamos la ruta absoluta al archivo que queremos eliminar.
        const imgPath = path.join(
            process.cwd(),
            process.env.UPLOADS_DIR,
            imgName,
        );

        try {
            // Intentamos acceder al archivo que queremos eliminar.
            await fs.access(imgPath);

            // Eliminamos la foto.
            await fs.unlink(imgPath);
        } catch {
            // Si la imagen que queremos eliminar no existe "access" lanzará un error.
            // Finalizamos la función.
            return;
        }
    } catch (err) {
        console.error(err);

        generateErrorUtil('Error al eliminar archivo del disco', 500);
    }
};

export default removePhotoUtil;
