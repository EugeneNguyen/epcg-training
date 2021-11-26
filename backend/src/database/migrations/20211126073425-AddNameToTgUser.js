'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'tgUsers',
      'name',
      {
        type: Sequelize.STRING,
        after: "password"
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tgUsers', 'name');
  }
};
