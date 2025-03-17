// Importar el módulo 'dotenv' para cargar variables de entorno desde un archivo .env
const dotenv = require("dotenv");

// Cargar las variables de entorno definidas en el archivo .env
dotenv.config();

// Exportar un objeto con las variables de entorno necesarias para la configuración de la aplicación
module.exports = {
    // Puerto en el que la aplicación escuchará las solicitudes
    PORT: process.env.PORT,

    // Nombre de la base de datos
    DB_NAME: process.env.DB_NAME,

    // Usuario de la base de datos
    DB_USER: process.env.DB_USER,

    // Contraseña de la base de datos
    DB_PASWORD: process.env.DB_PASWORD,

    // Host de la base de datos (por ejemplo, 'localhost' o una dirección IP)
    DB_HOST: process.env.DB_HOST,

    // Puerto de la base de datos (por ejemplo, 3306 para MySQL)
    DB_PORT: process.env.DB_PORT,

    // Clave secreta para la generación y verificación de tokens JWT (JSON Web Tokens)
    JWT_SECRET: process.env.TWR_SECRET
};