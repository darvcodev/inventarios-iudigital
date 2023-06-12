const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarMarca } = require("../helpers/validar-marca");
const { validarRolAdmin } = require("../middlewares/validar-rol-admin");

const Marca = require("../models/Marca");

const router = Router();

router.get("/", [validarJWT, validarRolAdmin], async function (req, res) {
  try {
    const marcas = await Marca.find();
    res.send(marcas);
  } catch (error) {
    console.log(eror);
    res.status(500).send("Ocurrio un error");
  }
});

router.post("/", [validarJWT, validarRolAdmin], async function (req, res) {
  try {
    const validaciones = validarMarca(req);

    if (validaciones.length > 0) {
      return res.status(400).send(validaciones);
    }

    let marca = new Marca();
    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaCreacion = new Date();
    marca.fechaActualizacion = new Date();

    marca = await marca.save();
    res.send(marca);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error");
  }
});

router.put(
  "/:marcaId",
  [validarJWT, validarRolAdmin],
  async function (req, res) {
    try {
      const validaciones = validarMarca(req);

      if (validaciones.length > 0) {
        return res.status(400).send(validaciones);
      }

      let marca = await Marca.findById(req.params.marcaId);
      if (!marca) {
        return res.status(400).send(validaciones);
      }

      marca.nombre = req.body.nombre;
      marca.estado = req.body.estado;
      marca.fechaActualizacion = new Date();
      marca = await marca.save();
      res.send(marca);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error");
    }
  }
);

router.delete(
  "/:marcaId",
  [validarJWT, validarRolAdmin],
  async function (req, res) {
    try {
      console.log("Objeto recibido", req.body, req.params);
      let marca = await Marca.findById(req.params.marcaId);

      if (!marca) {
        return res.status(400).send("marca no existe");
      }
      marca = await marca.remove();
      res.send("Marca eliminada");
      console.log("Marca eliminada ", marca);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error");
    }
  }
);

router.get(
  "/:marcaId",
  [validarJWT, validarRolAdmin],
  async function (req, res) {
    try {
      const marca = await Marca.findById(req.params.marcaId);
      if (!marca) {
        return res.status(404).send("Marca no existe");
      }
      res.send(marca);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar marca");
    }
  }
);

module.exports = router;
