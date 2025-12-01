const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /users - Új felhasználó létrehozása
router.post('/', userController.createUser);

// GET /users - Összes felhasználó lekérdezése
router.get('/', userController.getAllUsers);

// DELETE /users/:id - Felhasználó és a hozzá tartozó feladatok törlése
router.delete('/:id', userController.deleteUser);

module.exports = router;
