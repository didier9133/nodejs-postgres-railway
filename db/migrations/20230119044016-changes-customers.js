'use strict';
const { DataTypes } = require('sequelize');
const { TABLE_NAME } = require('../models/customer.models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(TABLE_NAME, 'user_id', {
      field: 'user_id',
      unique: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_NAME, user_id, {
      field: 'user_id',
      unique: false,
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  },
};
