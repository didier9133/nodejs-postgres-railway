const { Model, DataTypes, Sequelize } = require('sequelize');
const { TABLE_NAME: productTableName } = require('./product.models');

const TABLE_NAME = 'images';

const ImagesSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW(),
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

class Image extends Model {
  static associate(models) {
    this.belongsTo(models.Product, { as: 'product' });
  }
  static config(clientSequialize) {
    return {
      sequelize: clientSequialize,
      tableName: TABLE_NAME,
      modelName: 'Image',
      timestamps: false,
    };
  }
}

module.exports = { Image, TABLE_NAME, ImagesSchema };
