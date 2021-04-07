const Juego = require("../database/models/juego");
const controladorJuego = {};

controladorJuego.getJuegos = async (req,res) =>{
    const juego = await Juego.find()
    res.json(juego);
};

controladorJuego.getJuego = async (req, res) => {
    const juego = await Juego.findById(req.params.id);
    res.json(juego);
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

    await juego.save();
    res.json({
        'status': 'Juego añadido.'
    });
};

controladorJuego.deleteJuego = async (req, res) => {
    await Juego.findByIdAndRemove(req.params.id);
    res.json({status: 'Juego eliminado.'})
};


controladorJuego.putJuego = async (req, res) => {
    const { id } = req.params;
    const juego = {
        nombre:                 req.body.nombre,
        desarrollador:          req.body.desarrollador,
        editor:                 req.body.editor,
        genero:                 req.body.genero,
        jugadores:              req.body.jugadores,
        duracion:               req.body.duracion,
        idioma:                 req.body.idioma,
        lanzamiento:            req.body.lanzamiento,
    }
    await Juego.findByIdAndUpdate(id, {$set:juego}, {new: true, useFindAndModify: false });
    //new true lo crea si no existe
    res.json({status: 'Juego actualizado.'});
};



module.exports = controladorJuego;