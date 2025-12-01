const userRepository = require('../repositories/userRepository');

const createUser = (userData) => {
  return userRepository.create(userData);
};

const getAllUsers = () => {
  return userRepository.findAll();
};

const deleteUser = async (id) => {
  const user = await userRepository.findById(id);

  if (!user) {
    return null;
  }

  await userRepository.destroy(user);
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
};