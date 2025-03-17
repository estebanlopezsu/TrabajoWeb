const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { type } = require('os');

// Definir el modelo 'User' para la tabla 'usuarios'
const User = sequelize.define('usuarios', {
    // Campo 'id': Clave primaria autoincremental
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    // Campo 'nombre': Nombre del usuario (no puede ser nulo)
    nombre: { type: DataTypes.STRING, allowNull: false },

    // Campo 'email': Correo electrónico del usuario (no puede ser nulo y debe ser único)
    email: { type: DataTypes.STRING, allowNull: false, unique: true },

    // Campo 'password': Contraseña del usuario (no puede ser nula)
    password: { type: DataTypes.STRING, allowNull: false },

    // Campo 'rol_id': Clave foránea que referencia a la tabla 'roles'
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' } 
    },

    // Campo 'administrador_id': Clave foránea que referencia a la tabla 'usuarios' (auto-referencia)
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'usuarios', key: 'id' } 
    }
}, {
    timestamps: false, 
    tableName: 'usuarios',
});

module.exports = User;