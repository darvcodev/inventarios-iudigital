const validarMarca = (req) => {
  const validaciones = [];
  if (!req.body.nombre) {
    validaciones.push("Nombre es requerido");
  }
  if (!req.body.estado) {
    validaciones.push("Estado es requerido");
  }

  return validaciones;
};

module.exports = {
  validarMarca,
};
