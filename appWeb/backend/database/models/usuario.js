const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        minlength: 2
    }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;