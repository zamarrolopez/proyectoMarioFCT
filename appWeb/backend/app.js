//Dependencias.
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const normalizePort = require('normalize-port');
//const dbConfig = require('./config/database.config');

//Sin usar.
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const mongoose = require('mongoose');

//

const app = express();

//Puerto normalizado
const PORT = normalizePort(process.env.PORT || '3000');

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.listen(PORT, () =>{
  console.log(`Servidor ejecutandosee en puerto ${PORT}.`);
});
