//CONSTANTE
const bcrypt = require("bcryptjs");
//MODELO
const Usuario = require("../database/models/usuario.model");
//Controlador
const controladorUsuario = {};

//GENERALES
controladorUsuario.getUsuarios = async (req, res) =>{
    await Usuario.find((err, usuarios)=>{
        if (err) {return res.status(500).send({ message: err });}
        if (!usuarios) {return res.status(404).send({ message: "Usuarios no encontrados." });}
        res.json(usuarios);
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
    let imagePath = req.body.imagePath; 
    if(req.file){  
      const url = req.protocol + '://'+ req.get("host");  
      imagePath = url + "/images/perfiles/"+req.file.filename  
    }  
    const usuario = {
        _id:            req.body.id,
        nombreU:        req.body.nombreU,
        pass:           req.body.pass,
        email:          req.body.email,
        nombre:         req.body.nombre,
        apellidos:      req.body.apellidos,
        tlf:            req.body.tlf,
        numLog:         req.body.numLog,
        roles:          req.body.roles,
        imagePath:      imagePath,
        juegos:         req.body.juegos
    }
    await Usuario.findByIdAndUpdate({_id:req.params.id}, usuario, {new: true, useFindAndModify: false }).then(result =>{ 
        res.status(200).json({
            message: "Usuario editado correctamente",
            usuario: {
                ...result,
                id:                     result._id,
                imagePath:              result.imagePath
            }
        });  
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
        res.json({status: 'Rol actualizado.'});
    });
};

controladorUsuario.putJuego = async (req, res) => {
    await Usuario.findById({_id:req.params.id}, async (err, usuario) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!usuario) {return res.status(404).send({ message: "Usuario no encontrados." });}
        usuario.juegos.push(req.body.juego);
        await Usuario.findByIdAndUpdate({_id:req.params.id}, {$set: {juegos: usuario.juegos}}, {new: true, useFindAndModify: false },(err, usuario)=>{
            res.json({status: 'Juego tomado en posesion.'});
        });
    })
};

controladorUsuario.deleteUsuario = async (req, res) => {
    await Usuario.findByIdAndRemove(req.params.id, (err, usuario)=>{
        if (err) {return res.status(500).send({ message: err });}
        if (!usuario) {return res.status(404).send({ message: "Usuario no encontrados." });}
        res.json({status: 'Usuario eliminado.'})
    });
};

controladorUsuario.comprobarJuego = async (req, res) => {
    console.log(req.params.juego)
    await Usuario.findById({_id:req.params.id},(err, usuario)=>{
        let posesion = false;
        let msg = "Juego no en posesión" 
        if (err) {return res.status(500).send({ message: err });}
        if (!usuario) {return res.status(404).send({ message: "Usuario no encontrados." });}
        usuario.juegos.forEach(juego => {
            if(juego==req.params.juego){
                posesion = true;
                msg = "Juego en posesión" 
            }
        });
        res.status(200).json({
            message:  msg,
            posesion: posesion
        });  
    });      
};



module.exports = controladorUsuario;