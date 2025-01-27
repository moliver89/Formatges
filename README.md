# Coworking

Portal para control de stock y venta en mercados con asignacion de genero.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

## Base de datos

### users

| Campo            | Tipo         | Descripción                           |
| ---------------- | ------------ | ------------------------------------- |
| id               | INT UNSIGNED | Identificador único del usuario       |
| email            | VARCHAR(255) | Email del usuario                     |
| username         | VARCHAR(255) | Nombre de usuario del usuario         |
| password         | VARCHAR(255) | Contraseña del usuario (hash)         |
| name             | VARCHAR(255) | Nombre del usuario                    |
| lastname         | VARCHAR(255) | Apellido del usuario                  |
| avatar           | VARCHAR(255) | URL del avatar del usuario            |
| role             | ENUM         | Rol del usuario ("SELLER" o "ADMIN")  |
| active           | BOOLEAN      | Usuario activado o no (DEFAULT FALSE) |
| registrationCode | CHAR(50)     | Codigo de registro                    |
| recoverPassCode  | CHAR(50)     | Codigo de recuperacion de contraseña  |
| createdAt        | DATETIME     | Fecha y hora de creación del usuario  |

### feria

| Campo       | Tipo          | Descripción                             |
| ----------- | ------------- | --------------------------------------- |
| id          | INT UNSIGNED  | Identificador único de la entrada       |
| name        | VARCHAR(255)  | Nombre de la feria                      |
| type        | ENUM          | Tipo de feria("MEDIEVAL", "STAND", ETC) |
| montaje     | DATETIME      | Fecha de montaje                        |
| opening     | DATETIME      | Fecha de inicio                         |
| closing     | DATETIME      | Fecha de final                          |
| price       | DECIMAL(10,2) | Precio                                  |
| organizador | VARCHAR(255)  | Organizador de la feria                 |
| userId      | INT UNSIGNED  | Identificador único del usuario         |
| createdAt   | DATETIME      | Fecha y hora de creación de la entrada  |

### products

| Campo       | Tipo          | Descripción                       |
| ----------- | ------------- | --------------------------------- |
| id          | INT UNSIGNED  | Identificador único de la entrada |
| name        | VARCHAR(255)  | Nombre del producto               |
| type        | VARCHAR(255)  | Tipo de producto                  |
| description | VARCHAR(255)  | Breve descripción                 |
| cost        | DECIMAL(10,2) | Costo del producto                |
| price       | DECIMAL(10,2) | Precio al público                 |
| stock       | INT UNSIGNED  | Stock del producto                |
| createdAt   | DATETIME      | Fecha y hora de creación          |

### feriaProducts

| Campo     | Tipo         | Descripción                       |
| --------- | ------------ | --------------------------------- |
| id        | INT UNSIGNED | Identificador único de la entrada |
| feriaId   | INT UNSIGNED | Identificador de la feria         |
| productId | INT UNSIGNED | Identificador del producto        |
| createdAt | DATETIME     | Fecha y hora de creación          |

### productPhotos

| Campo     | Tipo         | Descripción                                            |
| --------- | ------------ | ------------------------------------------------------ |
| id        | INT UNSIGNED | Identificador único de la foto                         |
| idOffice  | INT UNSIGNED | Identificador de la entrada a la que pertenece la foto |
| name      | VARCHAR(100) | Nombre de la foto                                      |
| createdAt | DATETIME     | Fecha y hora de creación de la foto                    |

## Endpoints del usuario

- **POST** - [`/users/register`] - Crea un nuevo usuario pendiente de activar. ✅
- **PATCH** - [`/users/activate/:registrationCode`] - Activa a un usuario mediante un código de registro. ✅
- **POST** - [`/users/login`] - Logea a un usuario retornando un token. ✅
- **GET** - [`/users/profile`] - Retorna información privada del usuario con el id del token. ✅
- **PATCH** - [`/users/editProfile`] - Permite actualizar el perfil del usuario.
- **PATCH** - [`/users/avatar`] - Permite actualizar el avatar del usuario.
- **GET** - [`/users/ferias`] - Retorna las reservas del usuario.
- **PUT** - [`/users/password/recover`] - Permite enviar un email de recuperación de contraseña.
- **PUT** - [`/users/password/reset/:recoverPassCode`] - Permite crear una nueva contraseña a partir de un código.

## Endpoints de las ferias

- **POST** - [`/feria/create`] - Crea una feria.
- **PUT** - [`/feria/edit/:feriaId`] - Permite editar una feria.
- **GET** - [`/feria/list`] - Retorna el listado de ferias.
- **GET** - [`/feria/products`] - Retorna los productos filtrados con una palabra clave.
- **GET** - [`/feria/:feriaId`] - Retorna una feria en concreto por ID.
- **GET** - [`/feria/:feriaId/products`] - Retorna los productos de una feria.
- **PUT** - [`/office/:idOffice/booking/:idBooking`] - Permite al admin administrar las ferias.
- **DELETE** - [`/office/:idOffice`] - Permite eliminar una feria en concreto por ID.
- **DELETE** - [`/office/:idBooking/booking`] - Elimina una feria.
