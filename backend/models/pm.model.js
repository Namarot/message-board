module.exports = (sequelize, Sequelize) => {
  const Pm = sequelize.define("pms", {
    content: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Pm;
};