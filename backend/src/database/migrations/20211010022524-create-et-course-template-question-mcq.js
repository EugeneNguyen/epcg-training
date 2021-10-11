'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('etCourseTemplateQuestionMCQs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      questionCode: {
        type: Sequelize.STRING
      },
      question: {
        type: Sequelize.TEXT
      },
      answerA: {
        type: Sequelize.TEXT
      },
      answerB: {
        type: Sequelize.TEXT
      },
      answerC: {
        type: Sequelize.TEXT
      },
      answerD: {
        type: Sequelize.TEXT
      },
      correctAnswer: {
        type: Sequelize.STRING
      },
      explanation: {
        type: Sequelize.TEXT
      },
      courseTemplateId: {
        type: Sequelize.UUID,
      },
      questionSourceId: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('etCourseTemplateQuestionMCQs');
  }
};