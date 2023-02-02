const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}
  async createOrder(userId) {
    const customer = await models.Customer.findOne({
      where: { '$user.id$': userId },
      include: [{ association: 'user' }],
    });
    if (!customer) throw boom.badRequest('customer no found');
    const { id } = customer;
    const data = {
      customerId: id,
    };
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async create(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return [];
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: { '$customer.user_id$': userId },
      include: [
        { association: 'customer', include: ['user'] },
        { association: 'items' },
      ],
    });

    return orders;
  }
  async findOne(id) {
    const OderSearched = await models.Order.findByPk(id, {
      include: [
        { association: 'customer', include: ['user'] },
        { association: 'items' },
      ],
    });
    if (!OderSearched) throw boom.notFound();
    return OderSearched;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;
