const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // for testing purposes
  app.get("/api/user/test/all", controller.allAccess);
  app.get(
    "/api/user/test/user",
    [authJwt.verifyToken, authJwt.isUser],
    controller.userBoard
  );
  app.get(
    "/api/user/test/moderator",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/api/user/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // public
  app.get("/api/user/:id", controller.getUser);
  app.get(
    "/api/user/username/:username",
    controller.getUserByUsername
  );
  app.get(
    "/api/user/:id/threads",
    controller.getThreadsByUser
  );
  app.get(
    "/api/user/:id/replies",
    controller.getRepliesByUser
  );

  // moderator or admin
  app.get(
    "/api/user",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.getUsers
  );
};