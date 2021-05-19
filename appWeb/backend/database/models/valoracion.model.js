const mongoose = require('mongoose');

const valoracionSchema = new mongoose.Schema({
    idJuego: {
        type: String,
        required:true
    },
    usuarios: { type: Array, required:true }

},{
    timestamps: true
});

module.exports = mongoose.model('Valoracion', valoracionSchema);