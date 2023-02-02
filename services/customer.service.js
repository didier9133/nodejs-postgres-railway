const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
// const pool = require('../libs/postgres');
const bcrypt = require('bcrypt');

//const { models } = require('../libs/sequelize') esta linea lo que esta trayendo
//es a sequelize es decir el cliente y dentro de el se crea ese models con el nombre
//que le pusimos en el modelName de la configuracion del modelo es lo mismo hacer
//sequelize.models.Customer de esta forma nos traemos las tablas creadas en el modelo

class CustomerService {
  constructor() {}

  async create(data) {
    // const newUser = await models.User.create(data.user);
    // const newCustomer = await models.Customer.create({
    //   ...data,
    //   userId: newUser.id,
    // });
    //esto realiza lo mismo que el codigo de arriba

    const hash = await bcrypt.hash(data.user.password, 10);
    data.user.password = hash;
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });

    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const res = await models.Customer.findAll({
      include: ['user'],
    });
    // const res = await pool.query('select * from task');
    return res;
  }

  async findOne(id) {
    const CustomerSearched = await models.Customer.findByPk(id, {
      include: ['user'],
    });
    if (!CustomerSearched) throw boom.notFound();
    return CustomerSearched;
  }

  async update(id, changes) {
    const Customer = await this.findOne(id);
    const rta = await Customer.update(changes);
    return rta;
  }

  async delete(id) {
    const Customer = await this.findOne(id);
    await Customer.destroy();
    return id;
  }
}

module.exports = CustomerService;

//{...data,userId:newUser.id} al enviar este objeto estamos enviando data.user que no seria lo
//ideal pero nuestra validacion del modelo pero solo tomara en cuenta los atributos qeu tenga que validar
//en el shema lo otro como data.user lo ignorara
