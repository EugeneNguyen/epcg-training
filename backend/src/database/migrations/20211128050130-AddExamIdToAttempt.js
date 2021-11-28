'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'etExamAttempts',
      'examId',
      {
        type: Sequelize.STRING,
        after: "userId"
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('etExamAttempts', 'examId');
  }
};
