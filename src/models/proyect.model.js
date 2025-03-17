// Importar DataTypes de Sequelize y la instancia de sequelize configurada
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definir el modelo 'Proyect' para la tabla 'proyectos'
const Proyect = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    // Campo 'nombre'
    nombre: { type: DataTypes.STRING, allowNull: false },

    // Campo 'descripcion'
    descripcion: { type: DataTypes.TEXT },

    // Campo 'fecha_creacion'
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

    // Campo 'administrador_id
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' } // Relación con la tabla 'usuarios'
    }
}, {
    timestamps: false, 
    tableName: 'proyectos', 

    // Hooks: Funciones que se ejecutan en ciertos eventos del ciclo de vida del modelo
    hooks: {
        afterCreate: (project, options) => {
            if (project.fecha_creacion) {
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() - 5);
            }
        }
    }
});

// Exportar el modelo para su uso en otros módulos
module.exports = Proyect;