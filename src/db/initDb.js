// Añadimos al proceso actual la lista de variables de entorno que figuran en el fichero ".env".
import 'dotenv/config';

// Función que retorna una conexión con la base de datos.
import getPool from './getPool.js';

// Función que genera las tablas.
const main = async () => {
    try {
        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        console.log('Borrando tablas...');

        // Borramos las tablas.
        await pool.query(
            'DROP TABLE IF EXISTS productPhotos, feriaProducts, products, ferias, users',
        );

        console.log('Creando tablas...');

        // Creamos la tabla de usuarios.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(255) UNIQUE NOT NULL,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL ,
                lastName VARCHAR(255)NOT NULL,
                avatar VARCHAR(255),
                role ENUM('NORMAL', 'ADMIN') DEFAULT 'NORMAL',
                active BOOLEAN DEFAULT FALSE, 
                registrationCode CHAR(50),
                recoverPassCode CHAR(50),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );	
        `);

        // Creamos la tabla de ferias.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS ferias (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                type ENUM ("MEDIEVAL", "RENACENTISTA", "MODERNISTA", "ROMANA", "STAND", "OTRO"),
                montaje DATETIME,
                opening DATETIME,
                closing DATETIME,
                price DECIMAL(10, 2) NOT NULL,
                organizador ENUM ("LA FRAGUA DE VULCANO", "MUSICAL SPORT", "RIVENDEL", "BALCONET", "TEMPUS AEVUS", "AYUNTAMIENTO", "OTRO"),
                userId INT UNSIGNED,
                    FOREIGN KEY (userId) REFERENCES users(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `);

        // Creamos la tabla de productos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                type ENUM("VACA", "CABRA", "OVEJA", "BUFALA", "TRUFA", "AZUL"),
                description VARCHAR(255),
                cost DECIMAL(10, 2) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                stock INT UNSIGNED,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP    
            )
            `);

        // Creamos la tabla de fotos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS productPhotos (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
				productId INT UNSIGNED,
                    FOREIGN KEY (productId) REFERENCES products(id),
				name VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
         )
        `);

        console.log('¡Tablas creadas!');

        // Cerramos el proceso con código 0 indicando que todo ha ido bien.
        process.exit(0);
    } catch (err) {
        console.error(err);

        // Cerramos el proceso con código 1 indicando que hubo un error.
        process.exit(1);
    }
};

// Llamamos a la función anterior.
main();
