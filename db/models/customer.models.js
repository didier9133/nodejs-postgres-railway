const { Model, DataTypes, Sequelize } = require('sequelize');
const { TABLE_NAME: userTableName } = require('./user.model');
const TABLE_NAME = 'customers';

const CustomerSchema = {
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
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW(),
  },
  userId: {
    field: 'user_id',
    unique: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: userTableName,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.hasMany(models.Order, { as: 'order', foreignKey: 'customerId' });
  }
  static config(clientSequialize) {
    return {
      sequelize: clientSequialize,
      tableName: TABLE_NAME,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { Customer, TABLE_NAME, CustomerSchema };

//foreign (llave foranea) va hacer userId
//DataTypes.NUMBER no va a correr va a botar error colocar el DataTypes.string
//{ as: 'user' } este alias es muy importante ya que gracias a el podemos
//llamarlo en los servicios dentro del include ['user'] para que me lo muestre
//la asociacion.
