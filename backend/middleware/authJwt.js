const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {

      if (role.name === "admin") {
        next();
        return;
      }
      res.status(403).send({
        message: "Requires Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      if (role.name === "moderator") {
        next();
        return;
      }
      res.status(403).send({
        message: "Requires Moderator Role!"
      });
    });
  });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      if (role.name === "user") {
        next();
        return;
      }
      res.status(403).send({
        message: "Requires User Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      if (role.name === "moderator") {
        next();
        return;
      }
      if (role.name === "admin") {
        next();
        return;
      }
      res.status(403).send({
        message: "Requires Moderator or Admin Role!"
      });
    });
  });
};

isUserModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      if (role.name === "user") {
        next();
        return;
      }
      if (role.name === "moderator") {
        next();
        return;
      }
      if (role.name === "admin") {
        next();
        return;
      }
      res.status(403).send({
        message: "Requires User, Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isUser: isUser,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isUserModeratorOrAdmin: isUserModeratorOrAdmin
};
module.exports = authJwt;
