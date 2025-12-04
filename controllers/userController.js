const userService = require('../services/userService');

// GET /users - Összes felhasználó lekérdezése
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Hiba a felhasználók lekérdezésekor:', error);
    res.status(500).json({ error: 'Hiba a felhasználók lekérdezésekor.' });
  }
};

// DELETE /users/:id - Felhasználó törlése
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'A megadott ID-val nem található felhasználó.' });
    }

    res.status(200).json({ message: `A(z) ${id} ID-jú felhasználó sikeresen törölve.` });
  } catch (error) {
    console.error('Hiba a felhasználó törlésekor:', error);
    res.status(500).json({ error: 'Szerveroldali hiba a törlés során.' });
  }
};

const registerUser = async (req, res) => {
    try {
      const newUser = await userService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Hiba az új user létrehozásakor:', error);
      res.status(error.statusCode || 500).json({ error: error.message || 'Szerveroldali hiba.' });
    }
  };


module.exports = {
  getAllUsers,
  deleteUser,
  registerUser };