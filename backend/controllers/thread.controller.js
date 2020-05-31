const db = require("../models");
const Thread = db.thread;
const Reply = db.reply;

exports.getThreads = (req, res) => {
  Thread.findAll().then(threads => {
    res.status(200).send(threads);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getThread = (req, res) => {
  const id = req.params.id;
  Thread.findByPk(id).then(thread => {
    res.status(200).send(thread);
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

exports.getThreadsByUser = (req, res) => {
  const userId = req.params.userId;
  Thread.findAll({
    where: {
      userId: userId
    }
  }).then(threads => {
    res.status(200).send(threads);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.createThread = (req, res) => {
  Thread.create({
    title: req.body.title,
    content: req.body.content
  }).then(thread => {
    thread.setCreator(req.userId).then(threadUpt => {
      res.status(201).send(threadUpt);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.editThread = (req, res) => {
  const threadId = req.params.threadId;
  Thread.findByPk(threadId).then(thread => {
    if (!thread) {
      return res.status(404).send({ message: "Thread Not found." });
    }
    if (thread.userId !== req.userId){
      return res.status(403).send({ message: "Thread belongs to another user."});
    }
    thread.update({
      content: req.body.content
    }).then(updatedThread => {
      res.status(200).send(updatedThread);
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.newReply = (req, res) => {
  const threadId = req.params.threadId;
  Thread.findByPk(threadId).then(thread => {
    if (!thread) {
      return res.status(404).send({ message: "Thread Not found." });
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