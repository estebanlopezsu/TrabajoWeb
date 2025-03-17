// Importar DataTypes de Sequelize y la instancia de sequelize configurada
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definir el modelo 'Permission' para la tabla 'permisos'
const Permission = sequelize.define('permisos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    // Campo 'nombre': Nombre del permiso (no puede ser nulo y debe ser único)
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    timestamps: false, // Desactivar los campos 'createdAt' y 'updatedAt'
    tableName: 'permisos', // Especificar el nombre de la tabla en la base de datos
});

module.exports = Permission;