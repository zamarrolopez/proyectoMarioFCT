/**/const express = require('express');
/**/const router = express.Router();
//Controlador
/**/const valoracion = require('../controllers/valoracion.controller');
//////////////////////////////////////////////////////////////////////////


router.get("/get", valoracion.getValoraciones);
router.get("/get/juego", valoracion.getPuntuacion);
router.get("/get/juego/usuario/:idJuego/:idUsuario", valoracion.getPuntuacionUsuario);
router.put("/put/valorar", valoracion.valorarJuego);


//Aqui exporto las rutas
module.exports = router;
