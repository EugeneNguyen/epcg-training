'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'etCourseTemplateQuestionMCQs',
      'questionImageId',
      {
        type: Sequelize.UUID,
        defaultValue: false,
        after: "question"
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('etCourseTemplateQuestionMCQs', 'questionImageId');
  }
};
