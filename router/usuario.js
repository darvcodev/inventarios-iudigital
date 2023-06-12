const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarRolAdmin } = require("../middlewares/validar-rol-admin");
const { validationResult, check } = require("express-validator");

const bycrypt = require("bcryptjs");

const Usuario = require("../models/Usuario");

const router = Router();

router.post(
  "/",
  [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("email", "invalid.email").isEmail(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
    check("contrasena", "invalid.contrasena").not().isEmpty(),
    check("rol", "invalid.rol").isIn(["ADMIN", "DOCENTE"]),
    validarJWT,
    validarRolAdmin,
  ],
  async function (req, res) {
    try {
      console.log(req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ mensaje: errors.array() });
      }

      const existeEmail = await Usuario.findOne({ email: req.body.email });
      if (existeEmail) {
        return res.status(400).json({ mensaje: "El email ya existe" });
      }

      console.log("Objeto recibido", req.body);

      const existeUsuario = await Usuario.findOne({ email: req.body.email });

      console.log("Respuesta existe usuario", existeUsuario);

      if (existeUsuario) {
        return res.status(400).send("Email ya existe");
      }

      let usuario = new Usuario();
      usuario.nombre = req.body.nombre;
      usuario.email = req.body.email;
      usuario.estado = req.body.estado;
      const salt = bycrypt.genSaltSync();
      const contrasena = bycrypt.hashSync(req.body.contrasena, salt);
      usuario.contrasena = contrasena;
      usuario.rol = req.body.rol;
      usuario.fechaCreacion = new Date();
      usuario.fechaActualizacion = new Date();
      usuario = await usuario.save();
      res.send(usuario);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: "Ocurrio un error en el servidor" });
    }
  }
);

router.get("/", [validarJWT, validarRolAdmin], async function (req, res) {
  try {
    const usuarios = await Usuario.find();
    res.send(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mensaje: "Ocurrio un error" });
  }
});

router.put(
  "/:usuarioId",
  [
    check("nombre", "invalid.nombre").not().isEmpty(),
    check("email", "invalid.email").isEmail(),
    check("estado", "invalid.estado").isIn(["Activo", "Inactivo"]),
    check("contrasena", "invalid.contrasena").not().isEmpty(),
    check("rol", "invalid.rol").isIn(["ADMIN", "DOCENTE"]),
    validarJWT,
    validarRolAdmin,
  ],
  async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ mensaje: errors.array() });
      }

      console.log("Objeto recibido", req.body, req.params);
      let usuario = await Usuario.findById(req.params.usuarioId);

      if (!usuario) {
        return res.status(400).send("Usuario no existe");
      }
      const existeUsuario = await Usuario.findOne({
        email: req.body.email,
        _id: { $ne: usuario._id },
      });

      console.log("Respuesta existe usuario", existeUsuario);

      if (existeUsuario) {
        return res.status(400).send("Email ya existe");
      }

      usuario.nombre = req.body.nombre;
      usuario.email = req.body.email;
      usuario.estado = req.body.estado;
      const salt = bycrypt.genSaltSync();
      const contrasena = bycrypt.hashSync(req.body.contrasena, salt);
      usuario.contrasena = contrasena;
      usuario.rol = req.body.rol;
      usuario.fechaActualizacion = new Date();
      usuario = await usuario.save();
      res.send(usuario);

      usuario = await usuario.save();
      res.send(usuario);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error");
    }
  }
);

router.delete(
  "/:usuarioId",
  [validarJWT, validarRolAdmin],
  async function (req, res) {
    try {
      console.log("Objeto recibido", req.body, req.params);
      let usuario = await Usuario.findById(req.params.usuarioId);

      if (!usuario) {
        return res.status(400).send("Usuario no existe");
      }
      usuario = await usuario.remove();
      res.send("Usuario eliminado");
      console.log("Usuario eliminado ", usuario);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error");
    }
  }
);

router.get(
  "/:usuarioId",
  [validarJWT, validarRolAdmin],
  async function (req, res) {
    try {
      const usuario = await Usuario.findById(req.params.usuarioId);
      if (!usuario) {
        return res.status(404).send("Usuario no existe");
      }
      res.send(usuario);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error al consultar usuario");
    }
  }
);

module.exports = router;
