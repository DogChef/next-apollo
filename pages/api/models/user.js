module.exports = (sequelize, DataTypes) => {
  return (User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [4, 12],
          msg: "Name must be between 4 and 12 characters long."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email addres must be valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }));
};
