'use strict';
const { TABLE_NAME } = require('../models/user.model');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(TABLE_NAME, 'recovery_token', {
      allowNull: true,
      type: DataTypes.STRING,
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn(TABLE_NAME, 'recovery_token');
  },
};
