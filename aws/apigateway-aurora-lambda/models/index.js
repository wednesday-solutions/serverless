const Sequelize = require('sequelize');
const SequelizeMock = require('sequelize-mock');

const db = {};
function getDB() {
  let sequelize;
  if (process.env.NODE_ENV === 'test') {
    sequelize = new SequelizeMock();
  } else {
    sequelize = new Sequelize(
      `${process.env.DB_DIALECT}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${
        process.env.DB_PORT
      }/${process.env.DB_NAME}`,
      {
        host: process.env.DB_HOST,
        logging: true,
        dialect: process.env.DB_DIALECT,
        pool: {
          min: 0,
          max: 10,
          idle: 10000
        },
        define: {
          userscored: true,
          timestamps: false
        }
      }
    );
  }
  const uuids = require('@models/uuids');
  const employees = require('@models/employees');
  const offices = require('@models/offices');
  const employeeOffice = require('@models/employee_office');

  db.uuids = uuids(sequelize, Sequelize.DataTypes);
  db.employees = employees(sequelize, Sequelize.DataTypes);
  db.offices = offices(sequelize, Sequelize.DataTypes);
  db.employeeOffice = employeeOffice(sequelize, Sequelize.DataTypes);

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
}

module.exports = { getDB };
