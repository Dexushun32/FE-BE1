const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// --- MÓDOSÍTÁS KEZDETE ---
const { registerValidationRules, loginValidationRules } = require('../validators/userValidators');
const validate = require('../middlewares/validationHandler');

// GET /users - Összes felhasználó lekérdezése
router.get('/', userController.getAllUsers);

// POST /users/register - Új felhasználó regisztrálása
router.post('/register', registerValidationRules(), validate, userController.registerUser);

// POST /users/login - Felhasználó bejelentkeztetése
router.post('/login', loginValidationRules(), validate, userController.loginUser);
// --- MÓDOSÍTÁS VÉGE ---

// DELETE /users/:id - Felhasználó törlése
router.delete('/:id', userController.deleteUser);

module.exports = router;
