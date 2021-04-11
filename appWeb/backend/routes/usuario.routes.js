/**/const express = require('express');
/**/const router = express.Router();
//Controlador
/**/const usuario = require('../controllers/usuario.controller');
//Middleware
/**/const verificarRegistro  = require("../middleware/verificarRegistro");
//////////////////////////////////////////////////////////////////////////

//Usuario
router.post("/usuario/registro",[
    verificarRegistro.checkDuplicateNombreCorreo,
    verificarRegistro.checkRolesExistente], usuario.registro);
router.post("/usuario/login", usuario.login);

router.get("/usuario/get", usuario.getUsuarios);
router.put("/usuario/put/:id", usuario.editarUsuario);

router.delete("/usuario/delete/:id", usuario.deleteUsuario);



//Aqui exporto las rutas
module.exports = router;
