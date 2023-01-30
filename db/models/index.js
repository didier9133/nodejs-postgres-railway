const { User, UsersChema } = require('./user.model.js');
const { Customer, CustomerSchema } = require('./customer.models');
const { Product, ProductSchema } = require('./product.models.js');
const { Category, CategorySchema } = require('./category.model.js');
const { Order, OrderSchema } = require('./order.models.js');
const { OrderProduct, OrderProductSchema } = require('./order-products.models');

function setUpModels(clientSequialize) {
  User.init(UsersChema, User.config(clientSequialize));
  Customer.init(CustomerSchema, Customer.config(clientSequialize));
  Category.init(CategorySchema, Category.config(clientSequialize));
  Product.init(ProductSchema, Product.config(clientSequialize));
  Order.init(OrderSchema, Order.config(clientSequialize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(clientSequialize));

  //associate
  User.associate(clientSequialize.models);
  Customer.associate(clientSequialize.models);
  Category.associate(clientSequialize.models);
  Product.associate(clientSequialize.models);
  Order.associate(clientSequialize.models);
}

module.exports = setUpModels;

//primero se debe crear category ya que es el papa de la relacion.
//el que lleva la llave foranea o foreignkey es el hijo si no esto dara un error
//de relacion.
