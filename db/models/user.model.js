const { Model, DataTypes, Sequelize } = require('sequelize');
const TABLE_NAME = 'users';

const UsersChema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW(),
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'userId' });
  }
  static config(clientSequialize) {
    return {
      sequelize: clientSequialize,
      tableName: TABLE_NAME,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = { User, TABLE_NAME, UsersChema };

//this.hasOne(models.Customer, { as: 'customer', foreignKey: 'userId' })
//de esta forma vamos a lograr que la relacion sea bidireccional
