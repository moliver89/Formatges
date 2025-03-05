// Importamos las dependencias
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import generateErrorUtil from './generateErrorUtil.js';

const savePhotoUtil = async (img, width) => {
    try {
        // Generamos la ruta absoluta al directorio.
        const uploadsPath = path.join(process.cwd(), process.env.UPLOADS_DIR);

        try {
            // Comprobamos si existe el directorio de subida de archivos.
            await fs.access(uploadsPath);
        } catch {
            // Si "access" lanza un error quiere decir que el directorio no existe. Lo creamos.
            await fs.mkdir(uploadsPath);
        }

        // Creamos una imagen de tipo Sharp.
        const sharpImg = sharp(img.data);

        // Redimensionamos la imagen.
        sharpImg.resize(width);

        // Generamos un nombre para el archivo
        const imgName = `${crypto.randomUUID()}.jpg`;

        // Generamos la ruta al archivo
        const imgPath = path.join(uploadsPath, imgName);

        // Guardamos la foto en la carpeta de subida de archivos.
        await sharpImg.toFile(imgPath);

        // Retornamos el nombre con el que hemos guardado la imagen
        return imgName;
    } catch (err) {
        console.error(err);

        generateErrorUtil('Error al guardar el archivo en disco', 500);
    }
};

export default savePhotoUtil;
