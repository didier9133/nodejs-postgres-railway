const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}
  async create(data) {
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
