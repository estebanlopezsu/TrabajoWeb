const userService = require("../services/user.service");

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol_id, administrador_id } = req.body;

        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);

        res.status(201).json({ message: "Usuario creado con éxito", user: newUser });
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar un usuario (incompleto)
exports.updateuser = async (req, res) => {
    const { id } = req.params;
    
};

// Controlador para obtener todos los usuarios asociados a un administrador
exports.getAllUserByAdministradorId = async (req, res) => {
    try {
        const admin_from_token = req.user.id;

       
        const { email } = req.query;

        // Llamar al servicio para obtener los usuarios
        const users = await userService.getAllUserByAdministradorId(admin_from_token, email);

        // Devolver una respuesta exitosa con los usuarios obtenidos
        res.status(200).json({ message: "Usuarios consultados con éxito", users });
    } catch (error) {
        // Manejar errores y devolver un mensaje de error
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
};

// Controlador para obtener todos los usuarios por ID de rol
exports.getAllUserByRolId = async (req, res) => {
    try {
        
        const users = await userService.getAllUserByRolId(req.params.id);

        res.status(200).json({ message: "Usuarios consultados con éxito", users });
    } catch (error) {
        
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
};

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
    const { id } = req.params; 
    const { nombre, email, rol_id, administrador_id } = req.body; 
    const admin_from_token = req.user.id; 

    try {
        // Llamar al servicio para actualizar el usuario
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);

        // Devolver una respuesta exitosa con el usuario actualizado
        res.status(200).json({ message: "Usuario actualizado con éxito", user });
    } catch (err) {
        // Manejar errores y devolver un mensaje de error
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const admin_from_token = req.user.id; 

    try {
        
        const result = await userService.deleteUser(id, admin_from_token);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};