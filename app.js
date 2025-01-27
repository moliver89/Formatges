// Activamos las variables de entorno personalizadas de .env
import 'dotenv/config';

// Importamos las dependencias
import express from 'express';

// Creamos el servidor
const app = express();

// Middleware que permite leer un body en formato JSON.
app.use(express.json());

app.use((req, res, next) => {
    console.log('Se inicio');
    next();
});

app.get('/', (req, res) => {
    res.send('Bienvenido');
});

//Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({
        status: 'error',
        message: err.message,
    });
});

// Middleware de ruta no encontrada
app.use((req, res) => {
    res.send('Ruta no encontrada');
});

// Indicamos al servidor que escuche peticiones en un puerto dado.
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
