const userRepository = require('../repositories/userRepository');

const authenticateToken = async (req, res, next) => {
  // 1. Token kiolvasása a 'Authorization' fejrészből
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formátum: "Bearer TOKEN"

  if (token == null) {
    return res.status(401).json({ error: 'Hiányzó authentikációs token.' }); // Unauthorized
  }

  try {
    // 2. Felhasználó keresése a token alapján
    const user = await userRepository.findOne({ where: { token: token } });

    if (!user) {
      return res.status(403).json({ error: 'Érvénytelen token.' }); // Forbidden
    }

    // 3. Token érvényességének ellenőrzése
    if (user.valid_thru < new Date()) {
      return res.status(401).json({ error: 'A token lejárt.' }); // Unauthorized
    }

    req.user = user; // A felhasználói adatokat a kérés objektumhoz csatoljuk
    next(); // Továbbengedjük a kérést a következő middleware-re vagy a controllerre
  } catch (error) {
    res.status(500).json({ error: 'Szerveroldali hiba a token validálása során.' });
  }
};

module.exports = authenticateToken;