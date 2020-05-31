const db = require("../models");
const Thread = db.thread;
const Reply = db.reply;


exports.getReply = (req, res) => {
  const id = req.params.id;
  Reply.findByPk(id).then(reply => {
    res.status(200).send(reply);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getThreadReplies = (req, res) => {
  const id = req.params.id;
  Reply.findAll({
    where: {
      threadId: id
    }
  }).then(replies => {
    res.status(200).send(replies);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getRepliesByUser = (req, res) => {
  const userId = req.params.userId;
  Reply.findAll({
    where: {
      userId: userId
    }
  }).then(replies => {
    res.status(200).send(replies);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.newReply = (req, res) => {
  if(!req.body.threadId){
    return res.status(400).send({ message: "No threadId"});
  }
  Thread.findByPk(req.body.threadId).then(thread => {
    if (!thread) {
      return res.status(404).send({ message: "Thread not found." });
    }
    Reply.create({
      content: req.body.content,
      userId: req.userId,
      threadId: req.body.threadId
    }).then(reply => {
      res.status(201).send(reply);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    })
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};
exports.newReplyToThread = (req, res) => {
  const threadId = req.params.threadId;
  Thread.findByPk(threadId).then(thread => {
    if (!thread) {
      return res.status(404).send({ message: "Thread not found." });
    }
    Reply.create({
      content: req.body.content,
      userId: req.userId,
      threadId: threadId
    }).then(reply => {
      res.status(201).send(reply);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    })
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.editReply = (req, res) => {
  const replyId = req.params.replyId;
  Reply.findByPk(replyId).then(reply => {
    if (!reply) {
      return res.status(404).send({ message: "Reply not found." });
    }
    if (reply.userId !== req.userId){
      return res.status(403).send({ message: "Reply belongs to another user."});
    }
    reply.update({
      content: req.body.content
    }).then(updatedReply => {
      res.status(200).send(updatedReply);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};