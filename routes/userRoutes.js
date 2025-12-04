const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { registerValidationRules } = require('../validators/userValidators');
const validate = require('../middlewares/validationHandler');

// GET /users - Összes felhasználó lekérdezése
router.get('/', userController.getAllUsers);

// POST /users/register - Új felhasználó regisztrálása
router.post('/register', registerValidationRules(), validate, userController.registerUser);

// DELETE /users/:id - Felhasználó törlése
router.delete('/:id', userController.deleteUser);

module.exports = router;
