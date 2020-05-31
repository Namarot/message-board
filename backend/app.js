const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var bcrypt = require("bcryptjs");

var corsOptions = {
  origin: "http://localhost:9001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// db
const db = require("./models");
const Role = db.role;
const User = db.user;
const config = require("./config/seed.config.js");

// db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync DB');
//   initial();
// });

db.sequelize.sync().then(() => {
  console.log('Syncing and Initializing DB');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello there!" });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/thread.routes')(app);
require('./routes/reply.routes')(app);
require('./routes/pm.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {

  Role.findOne({
    where: {
      name: "user"
    }
  }).then(role => {
    if(!role) {
      Role.create({
        id: 1,
        name: "user"
      });
    }
  });
  Role.findOne({
    where: {
      name: "moderator"
    }
  }).then(role => {
    if(!role) {
      Role.create({
        id: 2,
        name: "moderator"
      });
    }
  });
  Role.findOne({
    where: {
      name: "admin"
    }
  }).then(role => {
    if(!role) {
      Role.create({
        id: 3,
        name: "admin"
      });
    }
  });
  
  User.findOne({
    where: {
      username: "Admin01"
    }
  }).then(check => {
    if(!check){
      User.create({
        username: "Admin01",
        email: config.Admin01_email,
        password: bcrypt.hashSync(config.Admin01_PW, 8)
      }).then(user => {
        user.setRole(3)
      });
    }
  });
  User.findOne({
    where: {
      username: "Moderator01"
    }
  }).then(check => {
    if(!check){
      User.create({
        username: "Moderator01",
        email: config.Moderator01_email,
        password: bcrypt.hashSync(config.Moderator01_PW, 8)
      }).then(user => {
        user.setRole(2)
      });
    }
  });
}