const { models } = require('../db');
const { Task: TaskModel, User: UserModel } = models;

const create = (taskData) => {
  return TaskModel.create(taskData);
};

const findAll = () => {
  return TaskModel.findAll({ include: { model: UserModel, as: 'author' } });
};

const findAndCountAllPaginated = (limit, offset) => {
  return TaskModel.findAndCountAll({
    limit: limit,
    offset: offset,
    include: { model: UserModel, as: 'author' }
  });
};

const findById = (id) => {
  return TaskModel.findByPk(id);
};

const destroy = (task) => {
  return task.destroy();
};

module.exports = {
  create,
  findAll,
  findAndCountAllPaginated,
  findById,
  destroy,
};