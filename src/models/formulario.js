const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formulario = new Schema(
  {
    name: { type: String },
    sobrenome: { type: String },
    cpf: { type: Number },
    phone: { type: Number },
    profissao: { type: String },
    cep: { type: Number },
    endereco: { type: String },
    bairro: { type: String },
    cidade: { type: String },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Formulario", formulario);
