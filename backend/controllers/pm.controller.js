const db = require("../models");
const Pm = db.pm;
const User = db.user;
const Op =  db.Sequelize.Op;

exports.getPms = (req, res) => {
  Pm.findAll({
    where: {
      [Op.or]: [{senderId: req.userId}, {receiverId: req.userId}]
    }
  }).then(pms => {
    res.status(200).send(pms);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getSentPms = (req, res) => {
  Pm.findAll({
    where: {
      senderId: req.userId
    }
  }).then(pms => {
    res.status(200).send(pms);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getReceivedPms = (req, res) => {
  Pm.findAll({
    where: {
      receiverId: req.userId
    }
  }).then(pms => {
    res.status(200).send(pms);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getPm = (req, res) => {
  const id = req.params.id;
  Pm.findByPk(id).then(pm => {
    if(!(pm.senderId == req.userId) && !(pm.receiverId == req.userId)){
      return res.status(403).send({ message: "You are not authorized to view this message."});
    }
    res.status(200).send(pm);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.sendPm = (req, res) => {
  User.findByPk(req.body.receiverId).then(user => {
    if (!user) {
      return res.status(404).send({ message: "Receiver not found." });
    }
    Pm.create({
      content: req.body.content,
      senderId: req.userId,
      receiverId: req.body.receiverId
    }).then(pm => {
      res.status(201).send(pm);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    })
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};
