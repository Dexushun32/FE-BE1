const taskService = require('../services/taskService');

// POST /tasks
const createTask = async (req, res) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Hiba az új feladat létrehozásakor:', error);
    res.status(error.statusCode || 500).json({ error: error.message || 'Szerveroldali hiba.' });
  }
};

// GET /tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Hiba a feladatok lekérdezésekor:', error);
    res.status(500).json({ error: 'Hiba a feladatok lekérdezésekor.' });
  }
};

// GET /tasks/page/:page
const getTasksPaginated = async (req, res) => {
  try {
    const page = parseInt(req.params.page, 10); // A validátor már biztosítja, hogy ez szám
    const result = await taskService.getTasksPaginated(page);
    res.json(result);
  } catch (error) {
    console.error('Hiba a feladatok lapozott lekérdezésekor:', error);
    res.status(500).json({ error: 'Hiba a feladatok lapozott lekérdezésekor.' });
  }
};

// DELETE /tasks/:id
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await taskService.deleteTask(id);

    if (!deletedTask) {
      return res.status(404).json({ error: 'A megadott ID-val nem található feladat.' });
    }

    res.status(200).json({ message: `A(z) ${id} ID-jú feladat sikeresen törölve.` });
  } catch (error) {
    console.error('Hiba a feladat törlésekor:', error);
    res.status(500).json({ error: 'Szerveroldali hiba a törlés során.' });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTasksPaginated,
  deleteTask,
};