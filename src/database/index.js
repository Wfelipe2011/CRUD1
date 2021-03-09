const mongoose = require("mongoose");


const pastaMongo = "myFirstDatabase";
const senha = 661879
console.log(senha)
//`mongodb://localhost:27017/${pastaMongo}`
mongoose
  .connect( `mongodb+srv://Wilson:${senha}@cluster0.d07wk.mongodb.net/${pastaMongo}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Conectado ao Banco MongoDB");
  })
  .catch((error) => {
    console.log(`${error}: Erro ao conectar!`);
  });

module.exports = mongoose;


