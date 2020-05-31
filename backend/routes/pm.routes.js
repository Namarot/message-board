const { authJwt } = require("../middleware");
const controller = require("../controllers/pm.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // users, mods and admins
  app.get(
    "/api/pm",
    [authJwt.verifyToken, authJwt.isUserModeratorOrAdmin],
    controller.getPms
  );
  app.get(
    "/api/pm/sent",
    [authJwt.verifyToken, authJwt.isUserModeratorOrAdmin],
    controller.getSentPms
  );
  app.get(
    "/api/pm/received",
    [authJwt.verifyToken, authJwt.isUserModeratorOrAdmin],
    controller.getReceivedPms
  );
  app.get(
    "/api/pm/:id",
    [authJwt.verifyToken, authJwt.isUserModeratorOrAdmin],
    controller.getPm
  );
  app.post(
    "/api/pm",
    [authJwt.verifyToken, authJwt.isUserModeratorOrAdmin],
    controller.sendPm
  );
};