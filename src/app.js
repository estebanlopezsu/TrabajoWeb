const express = requiere("express");
const cors = requiere("cors");
const app = express();

app.use(express.json());
app.use(cors());

//importar rutas
const userRoutes = require("./routes/user.routes");
const authRoutes = require(".routes/auth.routes");
const projectRoutes = require(".routes/project.routes");

app.use("./api/v1", userRoutes);
app.use("./api/v1", authRoutes);
app.use("/api/v1", projectRoutes);


module.exports = app;