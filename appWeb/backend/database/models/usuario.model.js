const mongoose = require('mongoose');

const Roles = Object.freeze({
    Admin: 'admin',
    Mod: 'moderador',
    Usuario: 'usuario'
});

const UsuarioSchema = new mongoose.Schema({
    nombreU: {
        type: String,
        trim: true,
        minlength: 3,
        required:true
    },
    pass: {
        type: String,
        trim: true,
        minlength: 3,
        required:true
    },
    email: {
        type: String,
        trim: true,
        minlength: 5,
        required:true
    },
    nombre: {
        type: String,
        trim: true,
        default: ""
    },
    apellidos: {
        type: String,
        trim: true,
        default: ""
    },
    tlf: {
        type: Number,
        trim: true,
        default: 0
    },
    numLog:{
        type: Number,
        trim: true,
        default: 0
    },
    roles: {
        type: String,
        enum: Object.values(Roles),
        default: Roles.Usuario,
      }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);