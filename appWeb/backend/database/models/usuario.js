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
    },
    roles: {
        type: String,
        enum: Object.values(Roles),
        default: Roles.Usuario,
      }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;