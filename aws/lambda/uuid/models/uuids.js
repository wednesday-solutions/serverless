const moment = require('moment')
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('uuids', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: moment().format('YYYY-MM-DD HH:mm:s:ss')
    }
  }, {
    tableName: 'uuids'
  });
};
