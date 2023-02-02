const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const UserService = require('./user.service');
const config = require('../config');
const { models } = require('../libs/sequelize');

const service = new UserService();

class AuthService {
  async checkUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) throw boom.unauthorized();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized();
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }

  async getCustomer(userId) {
    const customer = await models.Customer.findAll({
      where: { user_id: userId },
    });

    return customer;
  }

  async recoveryPassword(email) {
    const user = await service.findByEmail(email);
    if (!user) throw boom.unauthorized();
    const customer = await this.getCustomer(user.id);
    if (!user) throw boom.unauthorized();

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://myfront.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });

    const infoMail = {
      from: 'didier9133@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email recovery password', // Subject line
      text: 'this is a text', // plain text body
      html: `<b>Dear,user please click on this link: ${link} </b>`, // html body
    };

    return await this.sendEmail(infoMail);
  }

  async sendEmail(infomail) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpEmail, // generated ethereal user
        pass: config.smtpPassword, // generated ethereal password
      },
    });

    await transporter.sendMail(infomail);

    return { message: 'mail sent succes' };
  }

  async changePassword(token, newPassword, sub) {
    const user = await service.findOne(sub);
    if (token !== user.recoveryToken) throw boom.unauthorized();
    const password = await bcrypt.hash(newPassword, 10);
    await service.update(sub, { password, recoveryToken: null });
    return { message: 'password changed' };
  }
}

module.exports = AuthService;
