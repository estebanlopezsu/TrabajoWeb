const Proyecto = require("../models/proyecto.model");
const UsuarioProyecto = require("../models/usuarioProyecto.model");

// Crear un nuevo proyecto
exports.createProyecto = async (nombre, descripcion, administrador_id) => {
    try {
        // Crear el proyecto en la base de datos
        const nuevoProyecto = await Proyecto.create({
            nombre,
            descripcion,
            administrador_id
        });

        return nuevoProyecto;
    } catch (err) {
        throw new Error(`Error al crear el proyecto: ${err.message}`);
    }
};

// Obtener todos los proyectos de un administrador
exports.getProyectosByAdministradorId = async (administrador_id) => {
    try {
        // Buscar todos los proyectos asociados al administrador
        const proyectos = await Proyecto.findAll({
            where: { administrador_id }
        });

        return proyectos;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Obtener un proyecto por su ID
exports.getProyectoById = async (id) => {
    try {
        // Buscar el proyecto por su ID
        const proyecto = await Proyecto.findByPk(id);

        if (!proyecto) {
            throw new Error("Proyecto no encontrado");
        }

        return proyecto;
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

// Actualizar un proyecto
exports.updateProyecto = async (id, nombre, descripcion, administrador_id) => {
    try {
        // Buscar el proyecto por su ID
        const proyecto = await Proyecto.findByPk(id);

        if (!proyecto) {
            throw new Error("Proyecto no encontrado");
        }

        // Verificar si el administrador tiene permisos para actualizar el proyecto
        if (proyecto.administrador_id !== administrador_id) {
            throw new Error("Acceso denegado, no eres el administrador de este proyecto");
        }

        // Actualizar los datos del proyecto
        await proyecto.update({
            nombre,
            descripcion
        });

        return proyecto;
    } catch (err) {
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};

// Eliminar un proyecto
exports.deleteProyecto = async (id, administrador_id) => {
    try {
        // Buscar el proyecto por su ID
        const proyecto = await Proyecto.findByPk(id);

        if (!proyecto) {
            throw new Error("Proyecto no encontrado");
        }

        // Verificar si el administrador tiene permisos para eliminar el proyecto
        if (proyecto.administrador_id !== administrador_id) {
            throw new Error("Acceso denegado, no eres el administrador de este proyecto");
        }

        // Eliminar el proyecto
        await proyecto.destroy();

        return { message: "Proyecto eliminado con éxito" };
    } catch (err) {
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};

// Asignar un usuario a un proyecto
exports.asignarUsuarioAProyecto = async (usuario_id, proyecto_id) => {
    try {
        // Verificar si el usuario ya está asignado al proyecto
        const existeAsignacion = await UsuarioProyecto.findOne({
            where: { usuario_id, proyecto_id }
        });

        if (existeAsignacion) {
            throw new Error("El usuario ya está asignado a este proyecto");
        }

        // Crear la asignación en la tabla usuarios_proyectos
        const asignacion = await UsuarioProyecto.create({
            usuario_id,
            proyecto_id
        });

        return asignacion;
    } catch (err) {
        throw new Error(`Error al asignar usuario al proyecto: ${err.message}`);
    }
};

// Obtener todos los usuarios asignados a un proyecto
exports.getUsuariosByProyectoId = async (proyecto_id) => {
    try {
        // Buscar todas las asignaciones de usuarios para el proyecto
        const usuarios = await UsuarioProyecto.findAll({
            where: { proyecto_id },
            include: [{ model: Usuario, attributes: { exclude: ["password"] } }] // Excluir la contraseña
        });

        return usuarios;
    } catch (err) {
        throw new Error(`Error al obtener los usuarios del proyecto: ${err.message}`);
    }
};