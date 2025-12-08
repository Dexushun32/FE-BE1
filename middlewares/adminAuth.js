/**
 * Middleware to check if the authenticated user is an admin.
 * It assumes that a previous middleware (e.g., tokenAuth) has already
 * attached the user object to the request (`req.user`).
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const adminAuth = (req, res, next) => {
  if (req.user && req.user.admin) {
    return next(); // User is an admin, proceed to the next middleware/handler
  }
  return res.status(403).json({ message: 'Hozzáférés megtagadva. Admin jogosultság szükséges.' });
};

module.exports = adminAuth;