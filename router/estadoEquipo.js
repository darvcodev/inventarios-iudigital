const { Router } = require("express");
const { validarEstadoEquipo } = require("../helpers/validar-estadoEquipo");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarRolAdmin } = require("../middlewares/validar-rol-admin");

const EstadoEquipo = require("../models/EstadoEquipo");

const router = Router();

router.get("/", [validarJWT, validarRolAdmin], async function (req, res) {
  try {
    const tipos = await EstadoEquipo.find();
    res.send(tipos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error");
  }
});

router.post("/", [validarJWT, validarRolAdmin], async function (req, res) {
  try {
    const validaciones = validarEstadoEquipo(req);

    if (validaciones.length > 0) {
      return res.status(400).send(validaciones);
    }

    let estadoEquipo = new EstadoEquipo();
    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.estado = req.body.estado;
    estadoEquipo.fechaCreacion = new Date();
    estadoEquipo.fechaActualizacion = Date();

    estadoEquipo = await estadoEquipo.save();
    res.send(estadoEquipo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor al crear estado del equipo 💻");
  }
});

router.put(
  "/:estadoEquipoId",
  [validarJWT, validarRolAdmin],
  async function (req, res) {
    try {
      const validaciones = validarEstadoEquipo(req);

      if (validaciones.length > 0) {
        return res.status(400).send(validaciones);
      }
      let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
      if (!estadoEquipo) {
        return res.status(400).send("No existe el estado del equipo 😔"); 
      }

      estadoEquipo.nombre = req.body.nombre;
      estadoEquipo.estado = req.body.estado;
      estadoEquipo.fechaActualizacion = Date();
      estadoEquipo = await estadoEquipo.save();
      res.send(estadoEquipo);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor al actualizar estado del equipo 💻");
    }
  }
);

router.delete(
  "/:estadoEquipoId",
  [validarJWT, validarRolAdmin],
  async function (req, res) {
    try {
      console.log("Objeto recibido", req.body, req.params);
      let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

      if (!estadoEquipo) {
        return res.status(400).send("Estado equipo no existe");
      }
      estadoEquipo = await estadoEquipo.remove();
      res.send("Estado equipo eliminado");
      console.log("Estado equipo eliminado ", estadoEquipo);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al eliminar estado del equipo 💻");
    }
  }
);

router.get(
  "/:estadoEquipoId",
  [validarJWT, validarRolAdmin],
  async function (req, res) {
    try {
      const estadoEquipo = await EstadoEquipo.findById(
        req.params.estadoEquipoId
      );
      if (!estadoEquipo) {
        return res.status(404).send("La marca no existe 😔");
      }
      res.send(estadoEquipo);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al obtener estado del equipo 💻");
    }
  }
);

module.exports = router;
