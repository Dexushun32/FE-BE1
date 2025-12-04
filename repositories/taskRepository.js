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

/**
 * Feladat törlése azonosító alapján.
 * @param {number} id A feladat azonosítója.
 * @returns {Promise<number>} A törölt sorok száma (0 vagy 1).
 */
const deleteById = (id) => {
  return TaskModel.destroy({ where: { id: id } });
};

module.exports = {
  create,
  findAll,
  findAndCountAllPaginated,
  findById,
  deleteById,
};