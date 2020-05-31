const { authJwt } = require("../middleware");
const controller = require("../controllers/reply.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // public
  app.get("/api/reply/:id", controller.getReply);
  app.get("/api/reply/thread/:id", controller.getThreadReplies)
  app.get("/api/reply/user/:userId", controller.getRepliesByUser);

  // users, mods and admins
  app.post(
    "/api/reply",
    [authJwt.verifyToken, authJwt.isUserModeratorOrAdmin],
    controller.newReply
  );
  app.post(
    "/api/reply/thread/:threadId",
    [authJwt.verifyToken, authJwt.isUserModeratorOrAdmin],
    controller.newReplyToThread
  );
  app.put(
    "/api/reply/:replyId",
    [authJwt.verifyToken, authJwt.isUserModeratorOrAdmin],
    controller.editReply
  );
};