/**/const express = require('express');
/**/const router = express.Router();
/**/const multer = require('multer');
//Controlador
/**/const juego = require('../controllers/juego.controller');
//Middleware
/**/const verificarJuego = require("../middleware/verificarJuegos");
/**/const verificarImagen = require("../middleware/verificarImagen");
//////////////////////////////////////////////////////////////////////////



//GENERALES
router.get("/get", juego.getJuegos);
router.get("/get/nombre", juego.getJuegosSortName);
router.delete("/delete", juego.deleteJuegos);
//ESPECIFICAS
router.get("/get/:id", juego.getJuego);
router.post("/post", multer({storage:verificarImagen.storageJuegos}).single("image"), verificarJuego.checkDuplicateJuego , juego.postJuego);
router.put("/put/:id",multer({storage:verificarImagen.storageJuegos}).single("image"),  juego.putJuego);
router.delete("/delete/:id", juego.deleteJuego);


//Aqui exporto las rutas
module.exports = router;
