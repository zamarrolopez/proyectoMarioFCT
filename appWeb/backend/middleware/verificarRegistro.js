const Usuario = require("../database/models/usuario");
const ROLES = ["usuario", "admin", "moderador"];

const verificarRegistro = {};

verificarRegistro.checkDuplicateNombreCorreo = (req, res, next) => {
    // Nombre de Usuario
    Usuario.findOne({
        nombreU: req.body.nombreU
    }).exec((err, usuario) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (usuario) {
            res.status(400).send({ message: "Error! Nombre ya en uso!" });
            return;
        }

        // Email
        Usuario.findOne({
            email: req.body.email
        }).exec((err, usuario) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (usuario) {
                res.status(400).send({ message: "Error! Correo ya en uso!" });
                return;
            }

            next();
        });
    });
};

verificarRegistro.checkRolesExistente = (req, res, next) => {
    if (req.body.roles) {
        if (!ROLES.includes(req.body.roles)) {
            res.status(400).send({
            message: `Error! Rol ${req.body.roles} no existe!`
            });
            return;
        }
    }
  next();
};


module.exports = verificarRegistro;