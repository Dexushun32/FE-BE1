const { models } = require('../db');
const { User: UserModel } = models;

/**
 * Új felhasználó létrehozása az adatbázisban.
 * @param {object} userData A felhasználó adatai.
 * @returns {Promise<User>} A létrehozott felhasználó.
 */
const create = (userData) => {
  return UserModel.create(userData);
};

/**
 * Egyedi felhasználó keresése feltétel alapján.
 * @param {object} query A Sequelize keresési feltétele (pl. { where: { email: '...' } }).
 * @returns {Promise<User|null>} A megtalált felhasználó vagy null.
 */
const findOne = (query) => {
  return UserModel.findOne(query);
};

/**
 * Összes felhasználó lekérdezése.
 * @returns {Promise<User[]>} A felhasználók listája.
 */
const findAll = () => {
  return UserModel.findAll();
};

/**
 * Felhasználó keresése azonosító alapján.
 * @param {number} id A felhasználó azonosítója.
 * @returns {Promise<User|null>} A megtalált felhasználó vagy null.
 */
const findById = (id) => {
  return UserModel.findByPk(id);
};

/**
 * Felhasználó törlése azonosító alapján.
 * @param {number} id A felhasználó azonosítója.
 * @returns {Promise<number>} A törölt sorok száma (0 vagy 1).
 */
const deleteById = (id) => {
  return UserModel.destroy({ where: { id: id } });
};

module.exports = {
  create,
  findOne,
  findAll,
  findById,
  deleteById,
};