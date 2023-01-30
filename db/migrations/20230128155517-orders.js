'use strict';
const {
  TABLE_NAME: ordersTableName,
  OrderSchema,
} = require('../models/order.models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ordersTableName, OrderSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ordersTableName);
  },
};
