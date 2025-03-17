// Importar Sequelize y dotenv para la configuración de la base de datos
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de Sequelize para la conexión a la base de datos
const sequelize = new Sequelize(
    process.env.DB_NAME,   // Nombre de la base de datos
    process.env.DB_USER,   // Usuario de la base de datos
    process.env.DB_PASWORK, // Contraseña de la base de datos
    {
        host: process.env.DB_HOST, // Host de la base de datos
        dialect: "postgres",       // Tipo de base de datos (PostgreSQL)
        port: process.env.DB_PORT, // Puerto de la base de datos
        logging: false,            // Desactivar logs de consultas SQL
        timezone: "-05.00"         // Zona horaria para la base de datos
    }
);

// Exportar la instancia de Sequelize para su uso en otros módulos
module.exports = sequelize;