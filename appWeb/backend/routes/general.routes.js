/**/const express = require('express');
/**/const router = express.Router();
//Controladores
/**/
/**/
/**/const usuario = require('../controlers/usuario.controller');
/**/
//Middleware
/**/
/**/
//////////////////////////////////////////////////////////////////////////


//Usuario
router.post("/usuario/registro", usuario.registro);
router.post("/usuario/login", usuario.login);

router.get("/usuario/get", usuario.getUsuarios);
router.put("/usuario/update/:id", usuario.editarUsuario);

//Aqui exporto las rutas
module.exports = router;
