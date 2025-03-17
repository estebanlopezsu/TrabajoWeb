const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definir el modelo 'UserProject' para la tabla 'usuarios_proyectos'
const UserProject = sequelize.define('usuarios_proyectos', {
    
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    // Campo 'usuario_id': Clave foránea que referencia a la tabla 'usuarios'
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' } 
    },

    // Campo 'proyecto_id': Clave foránea que referencia a la tabla 'proyectos'
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'proyectos', key: 'id' } 
    }
}, {
    timestamps: false,
    tableName: 'usuarios_proyectos',
});

module.exports = UserProject;