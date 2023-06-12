const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarRolAdmin } = require("../middlewares/validar-rol-admin");
const { validarTipoEquipo } = require("../helpers/validar-tipoEquipo");

const TipoEquipo = require("../models/TipoEquipo");

const router = Router();

router.get("/", [validarJWT, validarRolAdmin], async function (req, res) {
  try {
    const tipos = await TipoEquipo.find();
    res.send(tipos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error");
  }
});

router.post("/", [validarJWT, validarRolAdmin], async function (req, res) {
  try {
    const validaciones = validarTipoEquipo(req);

    if (validaciones.length > 0) {
      return res.status(400).send(validaciones);
    }

    let tipoEquipo = new TipoEquipo();
    tipoEquipo.nombre = req.body.nombre;
    tipoEquipo.estado = req.body.estado;
    tipoEquipo.fechaCreacion = new Date();
    tipoEquipo.fechaActualizacion = new Date();
    tipoEquipo = await tipoEquipo.save();
    res.send(tipoEquipo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error");
  }
});

router.put(
  "/:tipoEquipoId",
  [validarJWT, validarRolAdmin],
  async function (req, res) {
    try {
      const validaciones = validarTipoEquipo(req);

      if (validaciones.length > 0) {
        return res.status(400).send(validaciones);
      }

      let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
      tipoEquipo.nombre = req.body.nombre;
      tipoEquipo.estado = req.body.estado;
      tipoEquipo.fechaActualizacion = new Date();
      tipoEquipo = await tipoEquipo.save();
      res.send(tipoEquipo);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error");
    }
  }
);

router.delete(
  "/:tipoEquipoId",
  [validarJWT, validarRolAdmin],
  async function (req, res) {
    try {
      console.log("Objeto recibido", req.body, req.params);
      let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);

      if (!tipoEquipo) {
        return res.status(400).send("Tipo equipo no existe");
      }
      tipoEquipo = await tipoEquipo.remove();
      res.send("Tipo equipo eliminado");
      console.log("Tipo equipo eliminado ", tipoEquipo);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error");
    }
  }
);

router.get(
  "/:tipoEquipoId",
  [validarJWT, validarRolAdmin],
  async function (req, res) {
    try {
      const tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
      if (!tipoEquipo) {
        return res.status(404).send("Inventario no existe");
      }
      res.send(tipoEquipo);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar tipoEquipo");
    }
  }
);

module.exports = router;
