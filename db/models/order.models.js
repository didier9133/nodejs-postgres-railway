const { Model, DataTypes, Sequelize } = require('sequelize');
const { TABLE_NAME: customerTableName } = require('./customer.models');

const TABLE_NAME = 'orders';

const OrderSchema = {
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
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items?.length > 0) {
        return this.items.reduce((accumulador, currentItem) => {
          return (accumulador +=
            currentItem.price * currentItem.OrderProduct.amount);
        }, 0);
      }

      return 0;
    },
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
    // this.hasMany(models.Image,{as:'image',foreignKey:'productId'})
  }
  static config(clientSequialize) {
    return {
      sequelize: clientSequialize,
      tableName: TABLE_NAME,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { Order, TABLE_NAME, OrderSchema };
