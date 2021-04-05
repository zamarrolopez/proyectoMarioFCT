const mongoose = require('mongoose');

const JuegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        minlength: 2,
        required:true
    },
    desarrollador: {
        type: String,
        trim: true,
        minlength: 2
    },
    editor: {
        type: String,
        trim: true,
        minlength: 2
    },
    genero: {
        type: String,
        trim: true,
        minlength: 2
    },
    jugadores: {
        type: String,
        trim: true,
        minlength: 2
    },
    duracion: {
        type: String,
        trim: true,
        minlength: 2
    },
    idioma: {
        type: String,
        trim: true,
        minlength: 2
    },
    lanzamiento: {
        type: String,
        trim: true,
        minlength: 2
    }
});

const Juego = mongoose.model('Juego', JuegoSchema);
module.exports = Juego;