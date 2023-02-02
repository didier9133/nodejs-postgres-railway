const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    let data;
    if (property === 'user') {
      const { sub } = req[property];
      data = {
        customerId: sub,
      };
    } else {
      data = req[property];
    }
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      return next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
