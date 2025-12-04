const { body, param } = require('express-validator');

const createTaskValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('A "title" mező kitöltése kötelező.'),
    body('userId').isInt({ gt: 0 }).withMessage('A "userId" mezőnek egy pozitív egész számnak kell lennie.'),
  ];
};

const paginationValidationRules = () => {
  return [
    param('page').isInt({ gt: 0 }).withMessage('Az oldalszámnak egy pozitív egész számnak kell lennie.'),
  ];
};

module.exports = { createTaskValidationRules, paginationValidationRules };
