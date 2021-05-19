//MODELO
const Valoracion = require("../database/models/valoracion.model");
const Juego = require("../database/models/juego.model");
//CONTROLE
const controladorValoracion = {};

//ESPECIFICAS-------------------
controladorValoracion.getPuntuacion = async (req, res) =>{
    await Valoracion.findOne({ idJuego: req.body.idJuego } ,(err, valoracion) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!valoracion) {return res.status(404).send({ message: "Juego no encontrado." });}
        const puntuacion = 0;
        valoracion.usuarios.forEach(usuario => {
            puntuacion = usuario.puntuacion;
        });
        res.status(200).json(puntuacion);
    });
};

controladorValoracion.getPuntuacionUsuario = async (req, res) =>{
    await Valoracion.findOne({ idJuego: req.params.idJuego } ,(err, valoracion) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!valoracion) {return res.status(404).send({ message: "Usuario no encontrado." });}
        valoracion.usuarios.forEach(usuario => {
            //Si encuentra el usuario lo edita.
            if(usuario.idUsuario==req.params.idUsuario){
                res.status(200).json(usuario.puntuacion);
            }
        });
    });
};

controladorValoracion.valorarJuego = async (req, res) => {
    await Valoracion.findOne({ idJuego: req.body.idJuego } , async (err, valoracion) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!valoracion) {return res.status(404).send({ message: "Juego no encontrado." });}
        var valorado = false;
        var puntTemp = 0;
        var valorados = 0;
        valoracion.usuarios.forEach(usuario => {
            //Si encuentra el usuario lo edita.
            if(usuario.idUsuario==req.body.idUsuario){
                usuario.puntuacion = req.body.puntuacion;
                valorado = true;
            }                                                
            //Puntuacion
            puntTemp    += parseInt(usuario.puntuacion);    /*Puntos actuales */ 
            valorados   += 1;                               /*Cantidad Votos  */ 
        });
        //Si no encuentra el usuario le crea la puntuacion.
        if(valorado==false){
            valoracion.usuarios.push({idUsuario:req.body.idUsuario, puntuacion:req.body.puntuacion});
            puntTemp    += parseInt(req.body.puntuacion);
            valorados   += 1;
        }

        //Puntuacion exacta sin redondeo.
        puntTemp = puntTemp / valorados;
        
        await Valoracion.findOneAndUpdate({ idJuego: req.body.idJuego }, valoracion , async ()=>{
            await Juego.findByIdAndUpdate({_id:req.body.idJuego}, {$set: {puntos: Math.round(puntTemp)}}, {new: true, useFindAndModify: false },(err, result) =>{
                if (err) {return res.status(500).send({ message: err });}
                res.status(200).json({
                    message: "Puntuacion actualizada.",
                    juego: {
                        ...result,
                        id:                     result._id,
                        imagePath:              result.imagePath
                    }
                });  
            });
        });

    });
};


controladorValoracion.getValoraciones = async (req,res) =>{
    await Valoracion.find((err, valoraciones) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!valoraciones) {return res.status(404).send({ message: "Valoraciones no encontrados." });}
        res.status(200).json({
            message: "valoraciones encontradas",
            valoraciones: valoraciones
        });
    }); 
};


module.exports = controladorValoracion;