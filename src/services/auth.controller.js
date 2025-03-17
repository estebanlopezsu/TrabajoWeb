const authService = require("../services/auth.service");

// Controlador para iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Llamar al servicio de autenticación para iniciar sesión
        const token = await authService.loginUser(email, password);

        // Si el inicio de sesión es exitoso, devolver el token en la respuesta
        res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (err) {
        // Si hay un error, devolver un mensaje de error con el código de estado 400
        res.status(400).json({ message: err.message });
    }
};