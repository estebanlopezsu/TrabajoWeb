const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definir el modelo 'Role' para la tabla 'roles'
const Role = sequelize.define('roles', {
    // Campo 'id': Clave primaria autoincremental
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    // Campo 'nombre': Nombre del rol (no puede ser nulo y debe ser único)
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    timestamps: false, // Desactivar los campos 'createdAt' y 'updatedAt'
    tableName: 'roles', // Especificar el nombre de la tabla en la base de datos
});

module.exports = Role;