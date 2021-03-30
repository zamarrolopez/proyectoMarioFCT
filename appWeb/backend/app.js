const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const Usuario = require('./database/models/usuario');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,PATCH,DEL");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(3000, ()=> console.log("Servidor conectado en el puerto 3000"));
