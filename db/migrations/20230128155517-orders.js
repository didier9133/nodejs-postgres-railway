'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const { TABLE_NAME: ordersTableName } = require('../models/order.models');
const { TABLE_NAME: customerTableName } = require('../models/customer.models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ordersTableName, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW(),
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: customerTableName,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ordersTableName);
  },
};
