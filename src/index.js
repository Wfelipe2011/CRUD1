const express = require("express");
const mongoose = require("./database/index");
const app = express();
const router = require("./Router/index");
require("./models/formulario");
const Formulario = mongoose.model("Formulario");

app.use(express.json());

app.get("/formulario", async (req, res) => {
  const dados = req.body;
  const Date = await Formulario.findOne({ cpf: dados.cpf });

  if (Date === null) {
    return res.status(400).json({
      error: true,
      message: `Nenhum dado encontrado com o cpf:${dados.cpf}`,
    });
  } else {
    return res.json({
      Date: Date,
    });
  }
});

app.post("/formulario", async (req, res) => {
  // Validação de cadastro
  const cpfExiste = await Formulario.findOne({ cpf: req.body.cpf });
  if (cpfExiste) {
    return res.status(400).json({
      erro: true,
      message: "Usuario já existe!",
    });
  } else {
    await Formulario.create(req.body, (erro) => {
      const dados = req.body;
      if (erro)
        return res.status(400).json({
          error: true,
          message: "Erro: Não foi possivel cadastrar!",
        });

      return res.status(200).json({
        Date: dados,
      });
    });
  }
});

app.delete("/formulario", async (req, res) => {
  const dados = req.body;
  const Date = await Formulario.deleteOne({ cpf: dados.cpf });
  if (Date.n === 0) {
    return res.status(400).json({
      message: `Nenhum dado encontrado com o cpf:${dados.cpf}`,
    });
  } else {
    return res.json({
      message: "Usuario apagado com sucesso!",
    });
  }
});

app.patch("/formulario", async (req, res) => {
  const dados = req.body;
  const Date = await Formulario.updateOne({ cpf: dados.cpf }, {
    name: dados.name,
    sobrenome: dados.sobrenome,
    cpf: dados.cpf,
    phone: dados.phone,
    profissao: dados.profissao,
    cep: dados.cep,
    endereco: dados.endereco,
    bairro: dados.bairro,
    cidade:dados.cidade,
  });
  const usuario = await Formulario.findOne({ cpf: dados.cpf })
  console.log(usuario)
  if (Date.n === 0) {
    return res.status(400).json({
      message: `Nenhum dado encontrado com o cpf:${dados.cpf}`,
    });
  } else {
    return res.json({
      message: "Usuario atualizado com sucesso!",
      name: usuario.name,
      cpf: usuario.cpf
    });
  }
 
});

const porta = "https://api-formulario.herokuapp.com/" || 3000
app.listen(porta, () => {
  console.log("Servidor rodando!");
});
