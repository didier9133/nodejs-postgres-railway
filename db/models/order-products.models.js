const { Model, DataTypes, Sequelize } = require('sequelize');
const { TABLE_NAME: productTableName } = require('./product.models');
const { TABLE_NAME: orderTableName } = require('./order.models');

const TABLE_NAME = 'orders_products';

const OrderProductSchema = {
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
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: orderTableName,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: productTableName,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class OrderProduct extends Model {
  static associate(models) {
    // this.belongsTo(models.Customer, { as: 'customer' });
    // this.hasMany(models.Image,{as:'image',foreignKey:'productId'})
  }
  static config(clientSequialize) {
    return {
      sequelize: clientSequialize,
      tableName: TABLE_NAME,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}

module.exports = { OrderProduct, TABLE_NAME, OrderProductSchema };
