const express = require('express');
const app = express();

app.use(express.json());

//Routes
app.use('/api/',require('./routes/usuario.routes'));
app.use('/api/',require('./routes/juego.routes'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,PATCH,DEL");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, ()=> console.log("Servidor conectado en el puerto 3000"));
//Conexion a la BBDD.
require('./database/mongoose');