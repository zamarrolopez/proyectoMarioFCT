const mongoose = require('mongoose');
const { Schema } = mongoose;

const esquemaJuegos = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    pass: {type: String, required: true}
});


//Exporto el esquema                //Datos que almaceno
module.exports = mongoose.model('Juegos' , esquemaJuegos);
