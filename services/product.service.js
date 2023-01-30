const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
// const pool = require('../libs/postgres');

//const { models } = require('../libs/sequelize') esta linea lo que esta trayendo
//es a sequelize es decir el cliente y dentro de el se crea ese models con el nombre
//que le pusimos en el modelName de la configuracion del modelo es lo mismo hacer
//sequelize.models.Product de esta forma nos traemos las tablas creadas en el modelo

class ProductService {
  constructor() {}

  async create(data) {
    // const newUser = await models.User.create(data.user);
    // const newProduct = await models.Product.create({
    //   ...data,
    //   userId: newUser.id,
    // });
    //esto realiza lo mismo que el codigo de arriba
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    let options = { include: ['category'] };
    const { limit, offset, price, price_max, price_min } = query;
    if ((limit, offset)) {
      options = { ...options, offset, limit };
    }
    if (price) {
      options = { ...options, where: { price } };
    }
    if (price_max && !price_min) throw boom.badRequest('price_min is required');

    if (price_max && price_min) {
      options = {
        ...options,
        where: { price: { [Op.gte]: price_min, [Op.lte]: price_max } },
      };
    }
    const res = await models.Product.findAll(options);
    return res;
  }

  async findOne(id) {
    const ProductSearched = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!ProductSearched) throw boom.notFound();
    return ProductSearched;
  }

  async update(id, changes) {
    const Product = await this.findOne(id);
    const rta = await Product.update(changes);
    return rta;
  }

  async delete(id) {
    const Product = await this.findOne(id);
    await Product.destroy();
    return id;
  }
}

module.exports = ProductService;

//{...data,userId:newUser.id} al enviar este objeto estamos enviando data.user que no seria lo
//ideal pero nuestra validacion del modelo pero solo tomara en cuenta los atributos qeu tenga que validar
//en el shema lo otro como data.user lo ignorara
