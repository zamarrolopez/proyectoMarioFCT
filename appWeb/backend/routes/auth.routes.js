/**/const express = require('express');
/**/const router = express.Router();
//Controlador
/**/const auth = require('../controllers/auth.controller');
//Middleware
/**/const verificarRegistro  = require("../middleware/verificarRegistro");
//////////////////////////////////////////////////////////////////////////

//Authentificacion
router.post("/registro",[
    verificarRegistro.checkDuplicateNombreCorreo,
    verificarRegistro.checkRolesExistente], auth.registro);
router.post("/login", auth.login);

//Aqui exporto las rutas
module.exports = router;