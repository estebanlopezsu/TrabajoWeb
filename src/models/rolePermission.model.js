const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definir el modelo 'RolePermission' para la tabla 'roles_permisos'
const RolePermission = sequelize.define('roles_permisos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    // Campo 'rol_id': Clave foránea que referencia a la tabla 'roles'
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' } // Relación con la tabla 'roles'
    },

    // Campo 'permiso_id': Clave foránea que referencia a la tabla 'permisos'
    permiso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'permisos', key: 'id' } // Relación con la tabla 'permisos'
    }
}, {
    timestamps: false,
    tableName: 'roles_permisos',
});

module.exports = RolePermission;