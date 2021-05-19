//CONSTANTE
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret_key = "mle-secret-key";
//MODELO
const Usuario = require("../database/models/usuario.model");
//CONTROLADOR
const controladorAuth = {};

controladorAuth.registro = async (req, res) => {
  const usuario = new Usuario({
      nombreU:    req.body.nombreU,
      pass:       bcrypt.hashSync(req.body.pass, 8),
      email:      req.body.email
  });

  await usuario.save((err, usuario) => {
      if (err) {return res.status(500).send({ message: "Error: "+err });}
      if (req.body.roles) {
          usuario.roles = req.body.roles;
          usuario.save(err => {
              if (err) {
                  res.status(500).send({ message: "Error: "+err });
                  return;
              }
              res.send({ message: "Usuario registrado correctamente con el rol de "+usuario.roles  });
          });
      }else{
          usuario.save((err) => {
              if (err) {return res.status(500).send({ message: err });}
              res.send({ message: "Usuario registrado correctamente!" });
          });
      }
  });
};

controladorAuth.login = async (req, res) => {
  await Usuario.findOne({nombreU: req.body.nombreU}, async (err, usuario) => {
      if (err) {return res.status(500).send({ message: err });}
      if (!usuario) {return res.status(404).send({ message: "Usuario no encontrado." });}
      //Comparo las contraseñas.
      var passValida = bcrypt.compareSync( req.body.pass, usuario.pass);
      if (!passValida) {return res.status(401).send({accessToken: null,message: "Contraseña Incorrecta!: "});}
      //Genero el tokken.
      var token = jwt.sign({ _id: usuario.id }, secret_key, {expiresIn: 3600}); // 1 hora
      //Aumento el contador de logeos del usuario.
      usuario.numLog = usuario.numLog + 1;
      await Usuario.findByIdAndUpdate(usuario.id, {$set:usuario}, {new: true, useFindAndModify: false });
      //Envio la respuesta.
      res.status(200).send({
          _id:            usuario.id,
          nombreU:        usuario.nombreU,
          pass:           usuario.pass,
          email:          usuario.email,
          nombre:         usuario.nombre,
          apellidos:      usuario.apellidos,
          tlf:            usuario.tlf,
          numLog:         usuario.numLog,
          roles:          usuario.roles,
          imagePath:      usuario.imagePath,
          juegos:         usuario.juegos,
          accessToken:    token
      });
  });
};

module.exports = controladorAuth;