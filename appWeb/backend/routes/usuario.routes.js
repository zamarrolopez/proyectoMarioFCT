/**/const express = require('express');
/**/const router = express.Router();
/**/const multer = require('multer');
//Controlador
/**/const usuario = require('../controllers/usuario.controller');
//Middleware
/**/const verificarImagen = require("../middleware/verificarImagen");
//////////////////////////////////////////////////////////////////////////



//GENERALES
router.get("/get", usuario.getUsuarios);
router.delete("/delete", usuario.deleteUsuarios);
//ESPECIFICAS
router.get("/get/:id", usuario.getUsuario);
router.put("/put/:id", multer({storage:verificarImagen.storagePerfil}).single("image"),  usuario.putUsuario);
router.put("/put/email/:id", usuario.putEmail);
router.put("/put/pass/:id", usuario.putPass);
router.put("/put/rol/:id", usuario.putRol);
router.delete("/delete/:id", usuario.deleteUsuario);

//Aqui exporto las rutas
module.exports = router;
