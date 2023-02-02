const express = require('express');
const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema');
const passport = require('passport');

const router = express.Router();
const service = new OrderService();

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const oder = await service.findOne(id);
      res.json(oder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOrderSchema, 'user'),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const newOrder = await service.createOrder(sub);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
