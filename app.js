// Activamos las variables de entorno personalizadas de .env
import 'dotenv/config';

// Importamos las dependencias
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';
// Importamos las rutas.
import userRoutes from './src/routes/userRoutes.js';
import feriaRoutes from './src/routes/feriaRoutes.js';

// Creamos el servidor
const app = express();

// Middleware que evita problemas de conexión entre cliente y servidor.
app.use(cors());

// Middleware que indica a Express cuál es el directorio de ficheros estáticos.
app.use(express.static(process.env.UPLOADS_DIR));

// Middleware que muestra por consola info sobre la petición entrante.
app.use(morgan('dev'));

// Middleware que permite leer un body en formato JSON.
app.use(express.json());

// Middleware que permite leer un body en formato "form-data" (para archivos).
app.use(fileUpload());

// Middleware que indica a Express dónde están las rutas.
app.use('/api', userRoutes);
app.use('/api', feriaRoutes);

//Middleware de manejo de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({
        status: 'error',
        message: err.message,
    });
});

// Middleware de ruta no encontrada
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

// Indicamos al servidor que escuche peticiones en un puerto dado.
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
