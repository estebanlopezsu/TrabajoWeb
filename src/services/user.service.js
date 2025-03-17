const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// Función para crear un nuevo usuario
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            throw new Error("El usuario ya existe");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario en la base de datos
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        // Devolver el usuario creado
        return newUser;
    } catch (err) {
        // Manejar errores y lanzar una excepción
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

// Función para obtener todos los usuarios asociados a un administrador
exports.getAllUserByAdministradorId = async (administrador_id, email) => {
    try {
        // Construir la cláusula WHERE para la consulta
        const whereClause = { administrador_id };
        if (email) {
            whereClause.email = email;
        }
        const users = await User.findAll({ where: whereClause, attributes: { exclude: ["password"] } });

        return users;
    } catch (err) {
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

// Función para obtener todos los usuarios por ID de rol
exports.getAllUserByRolId = async (rol_id) => {
    try {
        const users = await User.findAll({ where: { rol_id }, attributes: { exclude: ["password"] } });

        return users;
    } catch (err) {
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

// Función para actualizar un usuario
exports.updateUser = async (id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try {
        // Buscar el usuario por su ID
        const user = await User.findByPk(id);

        // Verificar si el usuario existe
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        // Verificar si el administrador tiene permisos para actualizar este usuario
        if (user.administrador_id !== admin_from_token) {
            throw new Error("Acceso denegado, este usuario no está bajo su administración");
        }

        // Verificar si el nuevo correo electrónico ya está en uso
        if (email && email !== user.email) {
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                throw new Error("El email ya está en uso");
            }
        }

        // Actualizar los datos del usuario
        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id
        });

        // Devolver el usuario actualizado
        return user;
    } catch (err) {
        // Manejar errores y lanzar una excepción
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

// Función para eliminar un usuario
exports.deleteUser = async (id, admin_from_token) => {
    try {
        // Buscar el usuario por su ID
        const user = await User.findByPk(id);

        // Verificar si el usuario existe
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        // Verificar si el administrador tiene permisos para eliminar este usuario
        if (user.administrador_id !== admin_from_token) {
            throw new Error("Acceso denegado, este usuario no está bajo su administración");
        }

        // Eliminar el usuario de la base de datos
        await user.destroy();

        // Devolver un mensaje de éxito
        return { message: "Usuario eliminado con éxito" };
    } catch (err) {
        // Manejar errores y lanzar una excepción
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};