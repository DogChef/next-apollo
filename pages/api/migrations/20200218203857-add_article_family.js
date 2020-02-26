"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn(
        "articles",
        "parentId",
        {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        {}
      )
    ]),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn("articles", "parentId", {})
};
