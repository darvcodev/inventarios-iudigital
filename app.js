const { main } = require("./config/database");

const AuthRoute = require("./router/auth");
const cors = require("cors");
const express = require("express");
const UsuarioRoute = require("./router/usuario");

main().catch((err) => console.log(err));

const app = express();

app.use(cors());

app.use(express.json());

app.use("/estado-equipo", require("./router/estadoEquipo"));
app.use("/inventario", require("./router/inventario"));
app.use("/login", AuthRoute);
app.use("/marca", require("./router/marca"));
app.use("/tipo-equipo", require("./router/tipoEquipo"));
app.use("/usuario", require("./router/usuario"));
app.use("/usuario", UsuarioRoute);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
);
