module.exports = (sequelize, Sequelize) => {
  const Thread = sequelize.define("threads", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Thread;
};