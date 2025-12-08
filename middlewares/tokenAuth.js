const { models } = require('../db');
const { User } = models;

/**
 * Middleware to authenticate a user via a bearer token.
 * It checks for a token in the 'Authorization' header, verifies it,
 * and attaches the corresponding user to the request object (`req.user`).
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const tokenAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Hiányzó vagy érvénytelen authentikációs token.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = await User.findOne({ where: { token } });

    if (!user) {
      return res.status(401).json({ message: 'Érvénytelen token.' });
    }

    if (user.valid_thru && new Date(user.valid_thru) < new Date()) {
      return res.status(401).json({ message: 'A token lejárt. Kérlek, jelentkezz be újra.' });
    }

    req.user = user; // Attach user object to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(500).json({ message: 'Szerverhiba az authentikáció során.', error: error.message });
  }
};

module.exports = tokenAuth;