/**/const express = require('express');
/**/const router = express.Router();
//Controlador
/**/const valoracion = require('../controllers/valoraracion.controller');
//////////////////////////////////////////////////////////////////////////


router.get("/get", valoracion.getValoraciones);
router.put("/put/valorar", valoracion.valorarJuego);


//Aqui exporto las rutas
module.exports = router;
