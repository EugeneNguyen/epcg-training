'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'etExamAttempts',
      'score',
      {
        type: Sequelize.INTEGER,
        defaultValue: false,
        after: "templateExamId"
      }
    );
    await queryInterface.addColumn(
      'etCourseTemplateQuestionMCQs',
      'score',
      {
        type: Sequelize.INTEGER,
        defaultValue: false,
        after: "courseTemplateId"
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('etExamAttempts', 'score');
    await queryInterface.removeColumn('etCourseTemplateQuestionMCQs', 'score');
  }
};
