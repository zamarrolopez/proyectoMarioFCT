//Modelo
const Usuario = require("../database/models/usuario.model");
//Controlador
const controladorUsuario = {};

//GENERALES
controladorUsuario.getUsuarios = async (req, res) =>{
    await Usuario.find((err, usuarios)=>{
        if (err) {return res.status(500).send({ message: err });}
        if (!usuarios) {return res.status(404).send({ message: "Usuarios no encontrados." });}
        res.json({status: 'Usuarios encontrados.',usuarios});
    });
};
controladorUsuario.deleteUsuarios = async (req, res) => {
    await Usuario.deleteMany();
    res.json({status: 'Todos los usuarios han sido eliminados.'})
};

//ESPECIFICAS-------------------
controladorUsuario.getUsuario = async (req, res) =>{
    await Usuario.findById(req.params.id ,(err, usuario) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!usuario) {return res.status(404).send({ message: "Usuario no encontrados." });}
        res.json(usuario);
    });
    
};

controladorUsuario.putUsuario = async (req, res) => {
    const usuario = {
        nombreU:        req.body.nombreU,
        pass:           req.body.pass,
        email:          req.body.email,
        nombre:         req.body.nombre,
        apellidos:      req.body.apellidos,
        tlf:            req.body.tlf,
        numLog:         req.body.numLog,
        roles:          req.body.roles
    }
    await Usuario.findByIdAndUpdate(req.params.id, {$set:usuario}, {new: true, useFindAndModify: false }, (err, usuario) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!usuario) {return res.status(404).send({ message: "Usuario no encontrados." });}
        res.json({status: 'Usuario actualizado.'});
    });
};

controladorUsuario.putEmail = async (req, res) => {
    await Usuario.findByIdAndUpdate({_id:req.params.id}, {$set: {email: req.body.email}}, {new: true, useFindAndModify: false },(err, usuario) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!usuario) {return res.status(404).send({ message: "Usuario no encontrados." });}
        res.json({status: 'Email actualizado.'});
    });

    
};

controladorUsuario.putPass = async (req, res) => {
    await Usuario.findByIdAndUpdate({_id:req.params.id}, {$set: {pass: req.body.pass}}, {new: true, useFindAndModify: false },(err, usuario)=>{
        if (err) {return res.status(500).send({ message: err });}
        if (!usuario) {return res.status(404).send({ message: "Usuario no encontrados." });}
        res.json({status: 'Contraseña actualizada.'});
    });
};

controladorUsuario.putRol = async (req, res) => {
    await Usuario.findByIdAndUpdate({_id:req.params.id}, {$set: {roles: req.body.roles}}, {new: true, useFindAndModify: false },(err, usuario)=>{
        if (err) {return res.status(500).send({ message: err });}
        if (!usuario) {return res.status(404).send({ message: "Usuario no encontrados." });}
        res.json({status: 'Contraseña actualizada.'});
    });
};

controladorUsuario.deleteUsuario = async (req, res) => {
    await Usuario.findByIdAndRemove(req.params.id, (err, usuario)=>{
        if (err) {return res.status(500).send({ message: err });}
        if (!usuario) {return res.status(404).send({ message: "Usuario no encontrados." });}
        res.json({status: 'Usuario eliminado.'})
    });
};
module.exports = controladorUsuario;