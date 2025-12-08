const taskRepository = require('../repositories/taskRepository');
const userRepository = require('../repositories/userRepository');

const createTask = async (taskData) => {
  const { userId } = taskData;

  const user = await userRepository.findById(userId);
  if (!user) {
    const error = new Error('A megadott userId-val nem található felhasználó.');
    error.statusCode = 404;
    throw error;
  }

  return taskRepository.create(taskData);
};

const getAllTasks = () => {
  return taskRepository.findAll();
};

const getTasksPaginated = async (page) => {
  const limit = 10;
  const offset = (page - 1) * limit;

  const { rows: tasks, count } = await taskRepository.findAndCountAllPaginated(limit, offset);

  return { tasks, totalItems: count, totalPages: Math.ceil(count / limit), currentPage: page };
};

const deleteTask = async (id) => {
  const taskToDelete = await taskRepository.findById(id);
  if (!taskToDelete) {
    return null;
  }

  await taskRepository.deleteById(id);
  // Visszaadjuk a törölt feladat adatait a sikeres művelet jelzésére.
  return taskToDelete;
};

module.exports = {
  createTask,
  getAllTasks,
  getTasksPaginated,
  deleteTask,
};