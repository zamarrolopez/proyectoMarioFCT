/**/const express = require('express');
/**/const router = express.Router();
//Controlador
/**/const usuario = require('../controllers/usuario.controller');
//Middleware
/**/
/**/
//////////////////////////////////////////////////////////////////////////

//Usuario
router.post("/usuario/registro", usuario.registro);
router.post("/usuario/login", usuario.login);

router.get("/usuario/get", usuario.getUsuarios);
router.put("/usuario/update/:id", usuario.editarUsuario);

router.delete("/usuario/delete/:id", usuario.deleteUsuario);



//Aqui exporto las rutas
module.exports = router;
