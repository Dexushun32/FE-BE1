const userRepository = require('../repositories/userRepository');

const registerUser = (userData) => {
  // Itt lehetne a jövőben a jelszó titkosítása vagy egyéb regisztrációs logika
  const { email, name, password } = userData;
  return userRepository.create({ email, name, password });
};

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
  registerUser,
};