'use strict';
const {
  TABLE_NAME: productsTableName,
  ProductSchema,
} = require('../models/product.models');
const {
  TABLE_NAME: categoriesTableName,
  CategorySchema,
} = require('../models/category.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(categoriesTableName, CategorySchema);
    await queryInterface.createTable(productsTableName, ProductSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(categoriesTableName);
    await queryInterface.dropTable(productsTableName);
  },
};
