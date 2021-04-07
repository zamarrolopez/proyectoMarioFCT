const Usuario = require("../database/models/usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const controladorUsuario = {};

controladorUsuario.registro = (req, res) => {
    const usuario = new Usuario({
        nombreU: req.body.nombreU,
        pass: bcrypt.hashSync(req.body.pass, 8),
        email: req.body.email
    });
    usuario.save((err, usuario) => {
        if (err) {return res.status(500).send({ message: err });}
        usuario.save((err) => {
            if (err) {return res.status(500).send({ message: err });}
            res.send({ message: "Usuario registrado correctamente!" });
        });  
    });
};

controladorUsuario.login = async (req, res) => {
    await Usuario.findOne({nombreU: req.body.nombreU}, (err, usuario) => {
        if (err) {return res.status(500).send({ message: err });}
        if (!usuario) {return res.status(404).send({ message: "Usuario no encontrado." });}
        //Comparo las contraseñas.
        var passValida = bcrypt.compareSync(req.body.pass,usuario.pass);
        if (!passValida) {return res.status(401).send({accessToken: null,message: "Contraseña Incorrecta!"});}
        //Genero el tokken.
        var token = jwt.sign({ _id: usuario.id }, "mle-secret-key", {expiresIn: 86400}); // 24 hours
        //Envio la respuesta.
        res.status(200).send({
            _id: usuario.id,
            nombreU: usuario.nombreU,
            pass: usuario.pass,
            email: usuario.email,
            accessToken: token
        });
    });
};

controladorUsuario.getUsuarios = async (req,res) =>{
    const usuario = await Usuario.find()
    res.json(usuario);
};

controladorUsuario.editarUsuario = async (req, res) => {
    const usuario = {
        nombreU:       req.body.nombreU,
        pass:          req.body.pass,
        email:         req.body.email
    }
    await Usuario.findByIdAndUpdate(req.params.id, {$set:usuario}, {new: true, useFindAndModify: false });
    //new true lo crea si no existe
    res.json({status: 'Usuario actualizado.'});
};

controladorUsuario.deleteUsuario = async (req, res) => {
    await Usuario.findByIdAndRemove(req.params.id);
    res.json({status: 'Usuario eliminado.'})
};
module.exports = controladorUsuario;