const { body } = require('express-validator');

const registerValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Érvénytelen e-mail cím formátum.'),
    body('password').notEmpty().withMessage('A "password" mező kitöltése kötelező.'),
    body('name').optional().isString().withMessage('A "name" mezőnek szövegnek kell lennie.'),
  ];
};

module.exports = { registerValidationRules };
