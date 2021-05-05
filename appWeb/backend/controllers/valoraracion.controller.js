//MODELO
const Valoracion = require("../database/models/valoracion.model");
//CONTROLE
const controladorValoracion = {};

//ESPECIFICAS-------------------
controladorValoracion.getValoracion = async (req, res) =>{
    await Valoracion.findOne({ idJuego: req.body.id } ,(err, valoracion) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!valoracion) {return res.status(404).send({ message: "Juego no encontrado." });}
        res.status(200).json(valoracion);
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

controladorValoracion.valorarJuego = async (req, res) => {
    await Valoracion.findOne({ idJuego: req.body.id } , async (err, valoracion) =>{
        if (err) {return res.status(500).send({ message: err });}
        if (!valoracion) {return res.status(404).send({ message: "Juego no encontrado." });}
        var votado = false;
        valoracion.usuarios.forEach(usuario => {
            if(usuario.idUsuario == req.body.idUsuario){
                votado = true;
            }
        });
        if(votado==false){
            valoracion.usuarios.push()
        }
        await valoracion.save();
        res.json({status: 'Puntuacion actualizada.'});

    });

};

module.exports = controladorValoracion;