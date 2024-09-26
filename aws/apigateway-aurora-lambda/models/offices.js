/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'offices',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      office_name: {
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: 'office_name'
      },
      office_address: {
        type: DataTypes.STRING(36),
        allowNull: false
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'id'
        },
        unique: 'offices_employee_id_fk'
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      tableName: 'offices',
      timestamps: false
    }
  );
};
