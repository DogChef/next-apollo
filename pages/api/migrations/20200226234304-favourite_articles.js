"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("favouriteArticles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      articleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "articles",
          key: "id"
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("favouriteArticles");
  }
};
