"use strict";
const { QueryTypes } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [4, 12],
            msg: "Name must be between 4 and 12 characters long."
          }
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
