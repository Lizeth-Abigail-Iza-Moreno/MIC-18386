const mongoose = require("mongoose");
const vehiculosSchema = new mongoose.Schema(
    {
        id: { type: String },
        placa: { type: String },
        modelo: { type: String },
        marca: { type: String },
        año: { type: Number },
        color: { type: String },
    },
    {
        collection: "vehiculos",
        versionKey: false
    }

);
module.exports = mongoose.model("vehiculos", vehiculosSchema);