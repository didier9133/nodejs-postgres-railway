'use strict';
const { TABLE_NAME, CustomerSchema } = require('../models/customer.models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(TABLE_NAME, CustomerSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
