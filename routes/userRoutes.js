const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tokenAuth = require('../middlewares/tokenAuth'); // Feltételezzük, hogy létezik egy tokenAuth middleware
const adminAuth = require('../middlewares/adminAuth'); // Az új admin middleware importálása

// Felhasználó regisztrációja
router.post('/register', userController.register);

// Felhasználó bejelentkezése
router.post('/login', userController.login);

// Felhasználó kijelentkezése
router.post('/logout', tokenAuth, userController.logout);

// Összes felhasználó lekérdezése (csak adminoknak)
// Először a tokenAuth fut le, majd az adminAuth, és csak utána a controller.
router.get('/', tokenAuth, adminAuth, userController.getAllUsers);

module.exports = router;