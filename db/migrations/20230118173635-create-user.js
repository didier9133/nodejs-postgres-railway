'use strict';
const { TABLE_NAME, UsersChema } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(TABLE_NAME, UsersChema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
