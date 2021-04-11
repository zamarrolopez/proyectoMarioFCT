/**/const express = require('express');
/**/const router = express.Router();
//Controlador
/**/const juego = require('../controllers/juego.controller');
//Middleware
/**/
/**/
//////////////////////////////////////////////////////////////////////////
router.post("/juego/post", juego.postJuego);
router.put("/juego/put/:id", juego.putJuego);

router.get("/juego/get", juego.getJuegos);
router.get("/juego/get/:id", juego.getJuego);

router.delete("/juego/delete/:id", juego.deleteJuego);


//Aqui exporto las rutas
module.exports = router;
