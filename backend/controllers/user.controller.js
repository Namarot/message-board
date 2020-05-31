const db = require("../models");
const User = db.user;
const Thread = db.thread;
const Reply = db.reply;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.getUsers = (req, res) => {
  User.findAll().then(users => {
    var usersReply = [];
    var userTemp = {};
    for (let i = 0; i < users.length; i++) {
      userTemp.id = users[i].id;
      userTemp.username = users[i].username;
      userTemp.email = users[i].email;
      usersReply.push(userTemp);
    }
    res.status(200).send(usersReply);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findByPk(id).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    res.status(200).send({
      id: user.id,
      username: user.username
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getUserByUsername = (req, res) => {
  const usernameParam = req.params.username;
  User.findOne({
    where: {
      username: usernameParam
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    res.status(200).send({
      id: user.id,
      username: user.username
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getThreadsByUser = (req, res) => {
  const id = req.params.id;
  Thread.findAll({
    where: {
      userId: id
    }
  }).then(threads => {
    res.status(200).send(threads);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getRepliesByUser = (req, res) => {
  const id = req.params.id;
  Reply.findAll({
    where: {
      userId: id
    }
  }).then(replies => {
    res.status(200).send(replies);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

