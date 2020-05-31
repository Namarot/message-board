const db = require("../models");
const config = require("../config/auth.config.js");
const User = db.user;
// const Role = db.role;

// const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      // user role = 1
      user.setRole(1).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 43200 // 12 hours
      });

      //var authorities = [];
      user.getRole().then(role => {
        //authorities.push("ROLE_" + role.name.toUpperCase());
        //authorities.push(role.name.toUpperCase());

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          role: role.name.toUpperCase(),
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};