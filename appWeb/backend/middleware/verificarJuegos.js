const Juego = require("../database/models/juego.model");

const verificarJuego = {};

verificarJuego.checkDuplicateJuego = (req, res, next) => {
    // Nombre del juego
    Juego.findOne({
        nombre: req.body.nombre
    }).exec((err, juego) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (juego) {
            res.status(400).send({ message: "Error! Nombre ya en uso!" });
            return;
        }
        next();
    });
};

module.exports = verificarJuego;