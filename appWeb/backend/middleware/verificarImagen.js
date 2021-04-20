const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './database/images')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
  })
   
const verificarImagen = multer({ storage: storage });

module.exports = verificarImagen