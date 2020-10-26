var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _employee_office = require("./employee_office");
var _offices = require("./offices");
var _employees = require("./employees");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var employee_office = _employee_office(sequelize, DataTypes);
  var offices = _offices(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);

  return {
    SequelizeMeta,
    employee_office,
    offices,
    employees,
  };
}
module.exports = { initModels };
