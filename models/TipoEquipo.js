const { Schema, model } = require("mongoose");

const TipoEquipoSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
      enum: ["Activo", "Inactivo"],
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

module.exports = model("TipoEquipo", TipoEquipoSchema);
