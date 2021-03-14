const express = require("express");
const mongoose = require("./database/index");
const app = express();
const cors = require('cors');
require('dotenv/config')
const router = require("./Router/index");
require("./models/formulario");
const Formulario = mongoose.model("Formulario");

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");// dentro do '*' poderia ser qual site poderia fazer a requisiçao.
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");

  app.use(cors());
  next();
})

app.get(`/formulario`, async (req, res) => {
  const Date = await Formulario.find();
  
  if (Date === null) {
    return res.status(400).json({
      error: true,
      message: `Nenhum dado encontrado com o cpf:${dados.cpf}`,
    });
  } else {
    return res.json(Date);
  }
});

app.get(`/formulario/:cpf`, async (req, res) => {
  const dados = req.params
  console.log(`Valor ho header: ${dados}`)
  const Date = await Formulario.findOne(dados);

  if (Date === null) {
    return res.status(400).json({
      error: true,
      message: `Nenhum dado encontrado com o cpf:${dados.cpf}`,
    });
  } else {
    return res.json(Date);
  }
});

app.get(`/formulario/:name`, async (req, res) => {
  const dados = req.params
  const Date = await Formulario.findOne(dados);
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


app.listen(process.env.PORT || 3000)


/**
 * StackOverflow
 * req.paramsretornará parâmetros na rota combinada. 
 * Se sua rota for / user /: id e você fizer uma solicitação para / user / 5 - req.paramsresultará{id: "5"}
 */