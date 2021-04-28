const multer = require('multer');
const verificarImagen = {};

const MIME_TYPE_MAP = {  
  'image/png': 'png',  
  'image/jpeg': 'jpg',  
  'image/jpg': 'jpg'  
};  

verificarImagen.storageJuegos = multer.diskStorage({  
  destination: (req, file, cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");  
    if(isValid){  
      error = null;  
    } 
    cb(null, "database/images/juegos");
  },
  filename: (req, file, cb)=>{  
    const name = file.originalname.toLowerCase().split(' ').join('_');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+ '-'+ Date.now()+ '.'+ ext); 
  }
});

verificarImagen.storagePerfil = multer.diskStorage({  
  destination: (req, file, cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");  
    if(isValid){  
      error = null;  
    } 
    cb(null, "database/images/perfil");
  },
  filename: (req, file, cb)=>{  
    const name = file.originalname.toLowerCase().split(' ').join('_');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+ '-'+ Date.now()+ '.'+ ext); 
  }
});
   


module.exports = verificarImagen