const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.thread = require("./thread.model.js")(sequelize, Sequelize);
db.reply = require("./reply.model.js")(sequelize, Sequelize);
db.pm = require("./pm.model.js")(sequelize, Sequelize);


db.role.hasMany(db.user, {as: "Users"});
db.user.belongsTo(db.role, {
  foreignKey: "roleId",
  as: "Role"
});

db.user.hasMany(db.thread, {as: "Threads"});
db.thread.belongsTo(db.user, {
  foreignKey: "userId",
  as: "Creator"
});

db.user.hasMany(db.reply, {as: "Replies"});
db.reply.belongsTo(db.user, {
  foreignKey: "userId",
  as: "Sender"
});

db.thread.hasMany(db.reply, {as: "Replies"});
db.reply.belongsTo(db.thread, {
  foreignKey: "threadId",
  as: "Parent"
});

db.user.hasMany(db.pm, {
  foreignKey: "senderId",
  as: "SentPms"
});
db.user.hasMany(db.pm, {
  foreignKey: "receiverId",
  as: "ReceivedPms"
});
db.pm.belongsTo(db.user, {
  foreignKey: "senderId",
  as: "Sender"
});
db.pm.belongsTo(db.user, {
  foreignKey: "receiverId",
  as: "Receiver"
});


db.ROLES = ["admin", "moderator", "user"];

module.exports = db;
