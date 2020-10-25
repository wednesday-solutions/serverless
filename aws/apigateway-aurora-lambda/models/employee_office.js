/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'employee_office',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      office_name: {
        type: DataTypes.STRING(36),
        allowNull: false
      },
      office_address: {
        type: DataTypes.STRING(36),
        allowNull: false
      },
      employee_name: {
        type: DataTypes.STRING(36),
        allowNull: false
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        },
        unique: 'employee_id_fk'
      },
      office_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'offices',
          key: 'id'
        },
        unique: 'office_id_fk'
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      tableName: 'employee_office',
      timestamps: false
    }
  );
};
