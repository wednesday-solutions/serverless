'use strict';

module.exports = {
  up: (queryInterface) => require('../utils/migrateUtils').migrate(__filename, queryInterface),

  down: (queryInterface, Sequelize) => {
  }
};
