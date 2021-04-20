/**/const express = require('express');
/**/const router = express.Router();
//Controlador
/**/const juego = require('../controllers/juego.controller');
//Middleware
/**/const verificarJuego = require("../middleware/verificarJuegos");
/**/const verificarImagen = require("../middleware/verificarImagen");
//////////////////////////////////////////////////////////////////////////



//GENERALES
router.get("/get", juego.getJuegos);
router.delete("/delete", juego.deleteJuegos);
//ESPECIFICAS
router.get("/get/:id", juego.getJuego);
router.post("/post",verificarImagen.single('imgUrl') ,verificarJuego.checkDuplicateJuego , juego.postJuego);
router.put("/put/:id", juego.putJuego);
router.delete("/delete/:id", juego.deleteJuego);


//Aqui exporto las rutas
module.exports = router;
