const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    estado: {
      type: String,
      required: true,
      enum: ["Activo", "Inactivo"],
    },
    contrasena: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
      enum: ["ADMIN", "DOCENTE"],
    },
    fechaCreacion: {
      type: Date,
      required: true,
    },
    fechaActualizacion: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Usuario", UsuarioSchema);
