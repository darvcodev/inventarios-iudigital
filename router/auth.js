const { generarJWT } = require("../helpers/jwt");
const { Router } = require("express");
const { validationResult, check } = require("express-validator");

const Usuario = require("../models/Usuario");

const router = Router();

router.post(
  "/",
  [
    check("email", "email.requerido").isEmail(),
    check("contrasena", "contrasena.requerida").not().isEmpty(),
  ],
  async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ mensaje: errors.array() });
      }

      const usuario = await Usuario.findOne({ email: req.body.email });
      if (!usuario) {
        return res.status(400).json({ mensaje: "No existe el usuario 😔" });
      }

      const token = generarJWT(usuario);

      res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        estado: usuario.estado,
        rol: usuario.rol,
        access_token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: "Error en el servidor 💻" });
    }
  }
);

module.exports = router;
