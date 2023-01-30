const express = require('express');

const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  updateCostumerSchema,
  createCostumerSchema,
  getCostumerSchema,
} = require('../schemas/costumer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCostumerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCostumerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCostumerSchema, 'params'),
  validatorHandler(updateCostumerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCostumerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
