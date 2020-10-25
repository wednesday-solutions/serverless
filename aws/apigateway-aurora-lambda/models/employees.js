/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employees', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    employee_name: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: "employee_name"
    },
    office_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'offices',
        key: 'id'
      },
      unique: "employees_ibfk_1"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'employees',
    timestamps: false
    });
};
