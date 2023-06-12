const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect("mongodb+srv://rojasvidaldaniel:NFuUuJEFoEYMA5bT@cluster0.h5dpqoy.mongodb.net/?retryWrites=true&w=majority");
    console.log("Conexión a la DB exitosa");
  } catch (error) {
    console.log("Error de conexión a la DB", error.stack);
  }
}

module.exports = { main };
