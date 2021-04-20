const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const jwt = require("jsonwebtoken");
const app = express();

//bodyParser, analiza la solicitud y crea el req.body
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//(Forma de conversion de datos para que se entienda)
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors({origin: 'http://localhost:4200'}));
app.use('/public', express.static(`${__dirname}/database/images`))
//Routes
app.use('/api/auth/',require('./routes/auth.routes'));
app.use('/api/usuario/',require('./routes/usuario.routes'));
app.use('/api/juego/',require('./routes/juego.routes'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,PATCH,DEL");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.listen(3000, ()=> console.log("Servidor conectado en el puerto 3000"));
//Conexion a la BBDD.
require('./database/mongoose');