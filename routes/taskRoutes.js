const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// POST /tasks - Új feladat létrehozása
router.post('/', taskController.createTask);

// GET /tasks - Összes feladat lekérdezése
router.get('/', taskController.getAllTasks);

// GET /tasks/page/:page - Feladatok lekérdezése lapozással (max 10)
router.get('/page/:page', taskController.getTasksPaginated);

// DELETE /tasks/:id - Feladat törlése ID alapján
router.delete('/:id', taskController.deleteTask);

module.exports = router;
