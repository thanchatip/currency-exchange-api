const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

class User extends Model {
  async validatePassword(password) {
    return await bcrypt.compare(password, this.Password);
  }
}

User.init(
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: async (user) => {
        if (user.Password) {
          const salt = await bcrypt.genSalt(10);
          user.Password = await bcrypt.hash(user.Password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.Password) {
          const salt = await bcrypt.genSalt(10);
          user.Password = await bcrypt.hash(user.Password, salt);
        }
      },
    },
  }
);

module.exports = User;
