const { models } = require('../db');
const { User: UserModel } = models;

const create = (userData) => {
  return UserModel.create(userData);
};

const findAll = () => {
  return UserModel.findAll();
};

const findById = (id) => {
  return UserModel.findByPk(id);
};

const destroy = (user) => {
  return user.destroy();
};

module.exports = {
  create,
  findAll,
  findById,
  destroy,
};