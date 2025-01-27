//Activamos las variables de entorno
import 'dotenv/config';
//Importamos la version asincrona del modulo "mysql2"
import mysql from 'mysql2/promise';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

let pool;

const getPool = async () => {
    try {
        //Si no existe un "pool" de conexiones lo crea
        if (!pool) {
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                timezone: 'Z',
            });

            // Con la conexión anterior creamos la base de datos si no existe.
            await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            // Seleccionamos la base de datos.
            await pool.query(`USE ${MYSQL_DB}`);
        } //Si el pool ya estaba creado solo lo devuelve mediante el return

        //Retornamos el "pool"
        return await pool;
    } catch (err) {
        console.error(err);
    }
};

export default getPool;
