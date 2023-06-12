const jwt = require("jsonwebtoken");

const generarJWT = (usuario) => {
  const payload = {
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    estado: usuario.estado,
    rol: usuario.rol,
  };

  const token = jwt.sign(payload, "123", { expiresIn: "1h" });
  return token;
};

module.exports = {
  generarJWT,
};
