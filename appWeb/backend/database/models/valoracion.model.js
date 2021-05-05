const mongoose = require('mongoose');

const valoracionSchema = new mongoose.Schema({
    idJuego: {
        type: String
    },
    usuarios: [
        {
            idUsuario:      {type: Number, default:0},
            puntuacion:     {type: Number, default:0}
        }
    ]
},{
    timestamps: true
});

module.exports = mongoose.model('Valoracion', valoracionSchema);