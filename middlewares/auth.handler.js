const boom = require('@hapi/boom');
const config = require('../config');

// function checkApikey(req, res, next) {
//   if (req.headers['api'] === config.apiKey) {
//     next();
//   } else {
//     next(boom.unauthorized());
//   }
// }

function checkApiRole(req, res, next) {
  const { role, sub } = req.user;
  if (role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}
function checkRoles(...roles) {
  return (req, res, next) => {
    const { role } = req.user;
    if (roles.includes(role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

module.exports = { checkApiRole, checkRoles };

//function checkRoles(...roles) esto lo que hara es que todos los argumentos que le enviemos los
//convertira en una array por ej: checkRoles('hola','como','estas') me lo tranformara en ['hola','como','estas']
