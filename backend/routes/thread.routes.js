const { authJwt } = require("../middleware");
const controller = require("../controllers/thread.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // public
  app.get("/api/thread", controller.getThreads);
  app.get("/api/thread/:id", controller.getThread);
  app.get("/api/thread/:id/replies", controller.getThreadReplies)
  app.get("/api/thread/user/:userId", controller.getThreadsByUser);

  // users, mods and admins
  app.post(
    "/api/thread",
    [authJwt.verifyToken, authJwt.isUserModeratorOrAdmin],
    controller.createThread
  );
  app.put(
    "/api/thread/:threadId",
    [authJwt.verifyToken, authJwt.isUserModeratorOrAdmin],
    controller.editThread
  );
  app.post(
    "/api/thread/:threadId",
    [authJwt.verifyToken, authJwt.isUserModeratorOrAdmin],
    controller.newReply
  );
};