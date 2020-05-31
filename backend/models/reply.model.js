module.exports = (sequelize, Sequelize) => {
  const Reply = sequelize.define("replies", {
    content: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Reply;
};