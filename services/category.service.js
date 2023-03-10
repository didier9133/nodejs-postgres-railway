const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
// const pool = require('../libs/postgres');

//const { models } = require('../libs/sequelize') esta linea lo que esta trayendo
//es a sequelize es decir el cliente y dentro de el se crea ese models con el nombre
//que le pusimos en el modelName de la configuracion del modelo es lo mismo hacer
//sequelize.models.Category de esta forma nos traemos las tablas creadas en el modelo

class CategoryService {
  constructor() {}

  async create(data) {
    // const newUser = await models.User.create(data.user);
    // const newCategory = await models.Category.create({
    //   ...data,
    //   userId: newUser.id,
    // });
    //esto realiza lo mismo que el codigo de arriba
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const res = await models.Category.findAll({
      include: ['products'],
    });
    // const res = await pool.query('select * from task');
    return res;
  }

  async findOne(id) {
    const CategorySearched = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!CategorySearched) throw boom.notFound();
    return CategorySearched;
  }

  async update(id, changes) {
    const Category = await this.findOne(id);
    const rta = await Category.update(changes);
    return rta;
  }

  async delete(id) {
    const Category = await this.findOne(id);
    await Category.destroy();
    return id;
  }
}

module.exports = CategoryService;

//{...data,userId:newUser.id} al enviar este objeto estamos enviando data.user que no seria lo
//ideal pero nuestra validacion del modelo pero solo tomara en cuenta los atributos qeu tenga que validar
//en el shema lo otro como data.user lo ignorara
