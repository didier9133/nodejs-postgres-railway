'use strict';
const { TABLE_NAME, UsersChema } = require('../models/user.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(TABLE_NAME, 'role', UsersChema.role);
  },
  async down(queryInterface) {
    await queryInterface.removeColumn(TABLE_NAME, 'role');
  },
};
