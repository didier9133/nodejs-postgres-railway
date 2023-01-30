const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const pool = require('../libs/postgres');

//const { models } = require('../libs/sequelize') esta linea lo que esta trayendo
//es a sequelize es decir el cliente y dentro de el se crea ese models con el nombre
//que le pusimos en el modelName de la configuracion del modelo es lo mismo hacer
//sequelize.models.User de esta forma nos traemos las tablas creadas en el modelo

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const res = await models.User.findAll({
      include: ['customer'],
    });
    // const res = await pool.query('select * from task');
    return res;
  }

  async findOne(id) {
    const userSearched = await models.User.findByPk(id);
    if (!userSearched) throw boom.notFound();
    return userSearched;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  }
}

module.exports = UserService;
