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
        type: Number,
        trim: true,
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
    },
    imagePath: { 
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Juego', JuegoSchema);