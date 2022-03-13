const express = require('express');
const app = express();
require('dotenv').config()

const cors = require('cors')
const PORT = process.env.PORT || 3004
app.use(cors())
app.use(express.json())

const routes = require("./routes/Routes")
app.use("/", routes)

app.listen(PORT, function() {
    console.log('App de Exemplo escutando na porta 3004!');
  });

