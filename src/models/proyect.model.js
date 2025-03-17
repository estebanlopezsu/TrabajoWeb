const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { Hooks } = require('sequelize/lib/hooks');
const { after } = require('lodash');

const Proyect = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
    }
}, {
    timestamps: false,
    tableName: 'proyectos',
    Hooks: {
        afterCreate: (project, option) => {
            if (project.fecha_creacion){
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() -5)
            }
        }
    }
});

module.exports = Proyect;