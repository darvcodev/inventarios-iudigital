const validarRolAdmin = (req, res, next) => {
  if (req.payload.rol !== "ADMIN") {
    return res.status(401).json({ mensaje: "No autorizado" });
  }
  next();
};

module.exports = {
  validarRolAdmin,
};
