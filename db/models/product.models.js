const { Model, DataTypes, Sequelize } = require('sequelize');
const TABLE_NAME = 'products';
const { TABLE_NAME: categoryTableName } = require('./category.model');

const ProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW(),
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: categoryTableName,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });

    // this.hasMany(models.Image,{as:'image',foreignKey:'productId'})
  }
  static config(clientSequialize) {
    return {
      sequelize: clientSequialize,
      tableName: TABLE_NAME,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

module.exports = { Product, TABLE_NAME, ProductSchema };
