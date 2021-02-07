module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("request", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      headers: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      query: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      body: {
        type: Sequelize.JSON,
        defaultValue: null,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("request");
  },
};
