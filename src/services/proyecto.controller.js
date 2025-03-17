const proyectoService = require("../services/proyecto.service");

// Crear un nuevo proyecto
exports.createProyecto = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const administrador_id = req.user.id; // Obtener el ID del administrador desde el token

    try {
        const proyecto = await proyectoService.createProyecto(nombre, descripcion, administrador_id);
        res.status(201).json({ message: "Proyecto creado con éxito", proyecto });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener todos los proyectos de un administrador
exports.getProyectosByAdministradorId = async (req, res) => {
    const administrador_id = req.user.id; // Obtener el ID del administrador desde el token

    try {
        const proyectos = await proyectoService.getProyectosByAdministradorId(administrador_id);
        res.status(200).json({ message: "Proyectos obtenidos con éxito", proyectos });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un proyecto por su ID
exports.getProyectoById = async (req, res) => {
    const { id } = req.params;

    try {
        const proyecto = await proyectoService.getProyectoById(id);
        res.status(200).json({ message: "Proyecto obtenido con éxito", proyecto });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar un proyecto
exports.updateProyecto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const administrador_id = req.user.id; // Obtener el ID del administrador desde el token

    try {
        const proyecto = await proyectoService.updateProyecto(id, nombre, descripcion, administrador_id);
        res.status(200).json({ message: "Proyecto actualizado con éxito", proyecto });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Eliminar un proyecto
exports.deleteProyecto = async (req, res) => {
    const { id } = req.params;
    const administrador_id = req.user.id; // Obtener el ID del administrador desde el token

    try {
        const result = await proyectoService.deleteProyecto(id, administrador_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Asignar un usuario a un proyecto
exports.asignarUsuarioAProyecto = async (req, res) => {
    const { usuario_id, proyecto_id } = req.body;

    try {
        const asignacion = await proyectoService.asignarUsuarioAProyecto(usuario_id, proyecto_id);
        res.status(201).json({ message: "Usuario asignado al proyecto con éxito", asignacion });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener todos los usuarios asignados a un proyecto
exports.getUsuariosByProyectoId = async (req, res) => {
    const { proyecto_id } = req.params;

    try {
        const usuarios = await proyectoService.getUsuariosByProyectoId(proyecto_id);
        res.status(200).json({ message: "Usuarios del proyecto obtenidos con éxito", usuarios });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};