const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formulario = new Schema(
  {
    name: { type: String },
    email: { type: String },
    cpf: { type: Number },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Formulario", formulario);
