const jwt = require("jsonwebtoken");
const bcrypt = require("bycrypjs");
const dotenv = require("dotenv");
const User = rewuire("../models/user.model");
const RolePermission = require("../models/rolesPermission.model");
const { where } = require("underscore");

dotenv.config();

const SECRET_KEY = process.eventNames.JWT_SECRET;  //Obtener la clave secreta de las variables de entorno

exports.loginUser = async (isEmail, password) => {
    try{
        //Verificar si el usuario existe
        const user = await User.findOne({ where: { email}});
        if (!user){
            throw new Error("Usuario no encontrado");
        }

        //verificar si la contraseña es correcta

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            throw new Error("contraseña incorrecta");
        }

        //consultar los permisos del rol
        const rolePermissions = await RolePermission.findeAll({
            where: { rol_id: user.rol_id},
            attributes: ["permiso_id"]
        });

        const permisos = rolePermissions.map(rp => rp.permiso_id);

        //Generar un token TWWT
        const token = jwt.sing(
            { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id, permisos},
            SECRET_KEY,
            { expiresIn: "1h"}
        );

        return token;
    } catch (error) {
        throw new Error(error.message || "Error al iniciar sesion");
    }  
};

exports.ge