const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");

function signUp(req, res) {
  const user = new User();

  const { name, lastname, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = "admin";
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las constraseñas son obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res
        .status(404)
        .send({ message: "Las contraseñas tienen que ser iguales" });
    } else {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          res.status(500).send({ message: "Error al encriptar la contraseña" });
        } else {
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "El usuario ya existe" });
            } else {
              if (!userStored) {
                res.status(404).send({ message: "Error al crear el usuario" });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
      //res.status(200).send({ message: "Usuario creado" });
    }
  }
}
module.exports = {
  signUp,
};
