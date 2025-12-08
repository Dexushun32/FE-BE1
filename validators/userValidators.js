const { body } = require('express-validator');
const userRepository = require('../repositories/userRepository');

const registerValidationRules = () => {
  return [
    body('email')
      .isEmail().withMessage('Érvénytelen e-mail cím formátum.')
      // --- MÓDOSÍTÁS KEZDETE ---
      .custom(async (value) => {
        const existingUser = await userRepository.findOne({ where: { email: value } });
        if (existingUser) {
          return Promise.reject('Ez az e-mail cím már regisztrálva van.');
        }
      }),
      // --- MÓDOSÍTÁS VÉGE ---
    body('password').notEmpty().withMessage('A "password" mező kitöltése kötelező.'),
    body('name').optional().isString().withMessage('A "name" mezőnek szövegnek kell lennie.'),
  ];
};

// --- MÓDOSÍTÁS KEZDETE ---
const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Az "email" mezőnek érvényes e-mail címnek kell lennie.'),
    body('password').notEmpty().withMessage('A "password" mező kitöltése kötelező.'),
  ];
};

module.exports = { registerValidationRules, loginValidationRules };
// --- MÓDOSÍTÁS VÉGE ---
