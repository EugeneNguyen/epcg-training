'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'etCourseTemplateExams',
      'duration',
      {
        type: Sequelize.INTEGER,
        after: "name"
      }
    );
    await queryInterface.addColumn(
      'etCourseTemplateExams',
      'numberOfQuestion',
      {
        type: Sequelize.INTEGER,
        after: "duration"
      }
    );
    await queryInterface.addColumn(
      'etCourseTemplateExams',
      'unlimitedTime',
      {
        type: Sequelize.BOOLEAN,
        after: "numberOfQuestion"
      }
    );
    await queryInterface.addColumn(
      'etCourseTemplateExams',
      'randomQuestionOrder',
      {
        type: Sequelize.BOOLEAN,
        after: "unlimitedTime"
      }
    );
    await queryInterface.addColumn(
      'etCourseTemplateExams',
      'randomChoiceOrder',
      {
        type: Sequelize.BOOLEAN,
        after: "randomQuestionOrder"
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('etCourseTemplateExams', 'duration');
    await queryInterface.removeColumn('etCourseTemplateExams', 'numberOfQuestion');
    await queryInterface.removeColumn('etCourseTemplateExams', 'randomQuestionOrder');
    await queryInterface.removeColumn('etCourseTemplateExams', 'randomChoiceOrder');
  }
};
