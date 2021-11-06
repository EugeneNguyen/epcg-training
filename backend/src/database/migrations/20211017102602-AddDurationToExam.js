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
    await queryInterface.addColumn(
      'etCourseTemplateExams',
      'isPublic',
      {
        type: Sequelize.BOOLEAN,
        after: "randomChoiceOrder"
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('etCourseTemplateExams', 'duration');
    await queryInterface.removeColumn('etCourseTemplateExams', 'numberOfQuestion');
    await queryInterface.removeColumn('etCourseTemplateExams', 'unlimitedTime');
    await queryInterface.removeColumn('etCourseTemplateExams', 'randomQuestionOrder');
    await queryInterface.removeColumn('etCourseTemplateExams', 'randomChoiceOrder');
    await queryInterface.removeColumn('etCourseTemplateExams', 'isPublic');
  }
};
