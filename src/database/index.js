const mongoose = require("mongoose");

let pastaMongo = "Teste";
pastaMongo = "Producao"
mongoose
  .connect(`mongodb://localhost:27017/${pastaMongo}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Conectado ao Banco MongoDB");
  })
  .catch((error) => {
    console.log(`${error}: Erro ao conectar!`);
  });

  module.exports = mongoose;