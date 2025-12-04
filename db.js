// 1. Importáljuk a szükséges modulokat
const { Sequelize, DataTypes } = require('sequelize');

// 2. Sequelize Kapcsolat Létrehozása (SQLite fájl)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Az adatbázis fájl neve
  logging: false, // Kikapcsolja a Sequelize SQL logjait
});

// 3. Modellek importálása és inicializálása
const TaskModel = require('./models/Task')(sequelize, DataTypes);
const UserModel = require('./models/User')(sequelize, DataTypes);

// 4. Modellek egy objektumba gyűjtése
const models = {
  User: UserModel,
  Task: TaskModel
};

// 5. Asszociációk beállítása
// A kaszkádolt törlés beállítása.
// Explicit módon itt definiáljuk újra a kapcsolatokat a megfelelő opciókkal.
models.User.hasMany(models.Task, { foreignKey: 'userId' });
models.Task.belongsTo(models.User, {
  foreignKey: 'userId',
  as: 'author', // Hozzáadva az 'author' alias, hogy a taskRepository tudja használni
  onDelete: 'SET NULL' // Ha egy User törlődik, a hozzá tartozó Task-okba NULL kerül.
});

// 6. Adatbázis Szinkronizálása
async function connectToDatabase() {
  try {
    // Kapcsolat ellenőrzése
    await sequelize.authenticate();
    console.log('Adatbázis kapcsolat létrejött.');

    // Táblák szinkronizálása a modellek alapján
    await sequelize.sync({
        force: false,
        alter: true
    });
    console.log("Minden modell szinkronizálva az adatbázissal.");
  } catch (error) {
    console.error('Hiba az adatbázis inicializálásakor:', error);
    process.exit(1); // Kilépés a folyamatból, ha az adatbázis-kapcsolat sikertelen
  }
}

// 7. Exportáljuk a kapcsolatot, a modelleket és a kapcsolódási függvényt
module.exports = {
  connectToDatabase,
  models
};
