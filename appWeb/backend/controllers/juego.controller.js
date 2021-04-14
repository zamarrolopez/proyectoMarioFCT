//Modelo
const Juego = require("../database/models/juego.model");
//Controlador
const controladorJuego = {};

//GENERALES
controladorJuego.getJuegos = async (req,res) =>{
    await Juego.find((err, juegos) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!juegos) {return res.status(404).send({ message: "Juegos no encontrados." });}
        res.json({status: 'Juegos encontrados.',juegos});
    }); 
};

controladorJuego.deleteJuegos = async (req, res) => {
    await Juego.deleteMany();
    res.json({status: 'Todos los juegos han sido eliminados.'})
};

//ESPECIFICAS-------------------
controladorJuego.getJuego = async (req, res) =>{
    await Juego.findById(req.params.id ,(err, juego) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!juego) {return res.status(404).send({ message: "Juego no encontrado." });}
        res.json(juego);
    });
};

controladorJuego.postJuego = async (req, res) => {
    const juego = new Juego({
        nombre:                 req.body.nombre,
        desarrollador:          req.body.desarrollador,
        editor:                 req.body.editor,
        genero:                 req.body.genero,
        jugadores:              req.body.jugadores,
        duracion:               req.body.duracion,
        idioma:                 req.body.idioma,
        lanzamiento:            req.body.lanzamiento,
    });
    await juego.save((err,juego)=>{
        if (err) {return res.status(500).send({ message: "Error: "+err });}
        res.json({status: 'Juego añadido.', juego});
    });
};

controladorJuego.putJuego = async (req, res) => {
    const juego = {
        nombre:                 req.body.nombre,
        desarrollador:          req.body.desarrollador,
        editor:                 req.body.editor,
        genero:                 req.body.genero,
        jugadores:              req.body.jugadores,
        duracion:               req.body.duracion,
        idioma:                 req.body.idioma,
        lanzamiento:            req.body.lanzamiento
    }
    await Juego.findByIdAndUpdate(req.params.id, {$set:juego}, {new: true, useFindAndModify: false }, (err, usuario) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!juego) {return res.status(404).send({ message: "Juego no encontrados." });}
        res.json({status: 'Juego actualizado.'});
    });
};

controladorJuego.deleteJuego = async (req, res) => {
    await Juego.findByIdAndRemove(req.params.id, (err, juego)=>{
        if (err) {return res.status(500).send({ message: err });}
        if (!juego) {return res.status(404).send({ message: "Juego no encontrado." });}
        res.json({status: 'Juego eliminado.'})
    });
};

module.exports = controladorJuego;