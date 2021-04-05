const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombreU: {
        type: String,
        trim: true,
        minlength: 2,
        required:true
    },
    pass: {
        type: String,
        trim: true,
        minlength: 2,
        required:true
    },
    email: {
        type: String,
        trim: true,
        minlength: 2,
        required:true
    },
    nombre: {
        type: String,
        trim: true,
        minlength: 2
    },
    apellidos: {
        type: String,
        trim: true,
        minlength: 2
    },
    tlf: {
        type: Number,
        trim: true,
        minlength: 9
    }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;