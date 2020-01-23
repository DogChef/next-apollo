import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

const host = "postgres"; // Change to localhost to get an .error() response at authenticate()

const sequelize = new Sequelize(`postgres://lotion:lotion@${host}:5432/lotion`);
const db = {};

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    console.log(db);
  })
  .catch(error => {
    console.error("Unable to connect to the database:", error);
  });

/*fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});*/

export default db;
