const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const saltRounds = 10;

/**
 * Handles user registration.
 * Hashes the password before saving the user.
 */
const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Az email és a jelszó megadása kötelező.' });
  }

  try {
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Ez az e-mail cím már regisztrálva van.' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userRepository.create({
      email,
      name,
      password: hashedPassword,
      admin: false // Alapértelmezetten nem admin
    });

    // A válaszban ne küldjük vissza a jelszót
    const { password: _, ...userResponse } = newUser.toJSON();
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Szerverhiba a regisztráció során.', error: error.message });
  }
};

/**
 * Handles user login.
 * Generates and saves a token upon successful authentication.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Az email és a jelszó megadása kötelező.' });
  }

  try {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Hibás e-mail cím vagy jelszó.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Hibás e-mail cím vagy jelszó.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const valid_thru = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 órás érvényesség

    await userRepository.update(user, { token, valid_thru });

    res.json({ message: 'Sikeres bejelentkezés.', token, userId: user.id, isAdmin: user.admin });
  } catch (error) {
    res.status(500).json({ message: 'Szerverhiba a bejelentkezés során.', error: error.message });
  }
};

/**
 * Handles user logout.
 * Invalidates the user's token.
 */
const logout = async (req, res) => {
  try {
    // A tokenAuth middleware csatolja a felhasználót a req.user-hez
    await userRepository.update(req.user, { token: null, valid_thru: null });
    res.json({ message: 'Sikeres kijelentkezés.' });
  } catch (error) {
    res.status(500).json({ message: 'Szerverhiba a kijelentkezés során.', error: error.message });
  }
};

/**
 * Gets all users. (Admin only)
 * This function is protected by adminAuth middleware.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userRepository.findAll();
    // Jelszavak eltávolítása a válaszból
    const usersWithoutPasswords = users.map(user => {
      const { password, token, ...userResponse } = user.toJSON();
      return userResponse;
    });
    res.json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json({ message: 'Szerverhiba a felhasználók lekérdezése során.', error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getAllUsers,
};