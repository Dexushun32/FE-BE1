// d:\VTI\Documents\VSCode\FE-BE_1\FE-BE1\models\User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    valid_thru: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: false
  });

  User.associate = function(models) {
    User.hasMany(models.Task, {
      foreignKey: 'userId',
    });
  };

  return User;
};
