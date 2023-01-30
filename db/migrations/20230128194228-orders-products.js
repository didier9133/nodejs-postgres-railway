'use strict';
const {
  TABLE_NAME: ordersProductsTableName,
  OrderProductSchema,
} = require('../models/order-products.models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      ordersProductsTableName,
      OrderProductSchema
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ordersProductsTableName);
  },
};
