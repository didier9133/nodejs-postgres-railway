const { Model, DataTypes, Sequelize } = require('sequelize');
const TABLE_NAME = 'categories';

const CategorySchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW(),
  },
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, { as: 'products', foreignKey: 'categoryId' });
  }
  static config(clientSequialize) {
    return {
      sequelize: clientSequialize,
      tableName: TABLE_NAME,
      modelName: 'Category',
      timestamps: false,
    };
  }
}

module.exports = { Category, TABLE_NAME, CategorySchema };
