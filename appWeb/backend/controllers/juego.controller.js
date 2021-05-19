//MODELO
const Juego = require("../database/models/juego.model");
const Valoracion = require("../database/models/valoracion.model");
//CONTROLE
const controladorJuego = {};

//GENERALES
controladorJuego.getJuegos = async (req,res) =>{
    await Juego.find((err, juegos) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!juegos) {return res.status(404).send({ message: "Juegos no encontrados." });}
        res.status(200).json({
            message: "Juegos encontrados",
            juegos: juegos
        });
    }); 
};

controladorJuego.getJuegosSortName = async (req,res) =>{
    await Juego.find({}).sort({nombre: 'asc'}).exec((err, juegos) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!juegos) {return res.status(404).send({ message: "Juegos no encontrados." });}
        res.status(200).json({
            message: "Juegos encontrados",
            juegos: juegos
        });
    }); 
};

controladorJuego.deleteJuegos = async (req, res) => {
    await Juego.deleteMany();
    await Valoracion.deleteMany();
    res.json({status: 'Todos los juegos han sido eliminados.'})
};

//ESPECIFICAS-------------------
controladorJuego.getJuego = async (req, res) =>{
    await Juego.findById(req.params.id ,(err, juego) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!juego) {return res.status(404).send({ message: "Juego no encontrado." });}
        res.status(200).json(juego);
    });
};

controladorJuego.postJuego = async (req, res, next) => {
    let imagePath = req.body.imagePath; 
    if(req.file){  
      const url = req.protocol + '://'+ req.get("host");  
      imagePath = url + "/images/juegos/"+req.file.filename  
    }  
    const juego = new Juego({
        nombre:                 req.body.nombre,
        descripcion:            req.body.descripcion,
        desarrollador:          req.body.desarrollador,
        editor:                 req.body.editor,
        genero:                 req.body.genero,
        jugadores:              req.body.jugadores,
        duracion:               req.body.duracion,
        idioma:                 req.body.idioma,
        lanzamiento:            req.body.lanzamiento,
        imagePath:              imagePath
    });

    await juego.save().then(async result =>{
        res.status(201).json({
            message: "Juego publicado correctamente",
            juego: {
                ...result,
                id:                     result._id,
                imagePath:              result.imagePath
            }
        }) 
        const valoracion = new Valoracion({
            idJuego: result._id
        });
        await valoracion.save();
    })

};

controladorJuego.putJuego = async (req, res) => {
    let imagePath = req.body.imagePath; 
    if(req.file){  
      const url = req.protocol + '://'+ req.get("host");  
      imagePath = url + "/images/juegos/"+req.file.filename  
    }  
    const juego = new Juego({
        _id:                    req.body.id,
        nombre:                 req.body.nombre,
        descripcion:            req.body.descripcion,
        desarrollador:          req.body.desarrollador,
        editor:                 req.body.editor,
        genero:                 req.body.genero,
        jugadores:              req.body.jugadores,
        duracion:               req.body.duracion,
        idioma:                 req.body.idioma,
        lanzamiento:            req.body.lanzamiento,
        imagePath:              imagePath,
        puntos:                 req.body.puntos
    });

    await Juego.findByIdAndUpdate({_id:req.params.id}, juego).then(result =>{ 
        res.status(200).json({
            message: "Juego actualizado correctamente",
            juego: {
                ...result,
                id:                     result._id,
                imagePath:              result.imagePath
            }
        });  
    });
};

controladorJuego.deleteJuego = async (req, res) => {
    await Juego.findByIdAndRemove(req.params.id, async (err) =>{
        if (err) {return res.status(500).send({ message: err });}
        await Valoracion.findOneAndRemove({idJuego: req.params.id});
        res.json({status: 'Juego eliminado.'})
    });
};


module.exports = controladorJuego;