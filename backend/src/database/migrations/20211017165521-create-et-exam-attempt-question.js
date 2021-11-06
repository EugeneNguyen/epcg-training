'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('etExamAttemptQuestions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      attemptId: {
        type: Sequelize.UUID
      },
      questionId: {
        type: Sequelize.UUID
      },
      order: {
        type: Sequelize.INTEGER,
      },
      displayedQuestionData: {
        type: Sequelize.TEXT,
      },
      fullQuestionData: {
        type: Sequelize.TEXT,
      },
      answer: {
        type: Sequelize.STRING,
        comment: 'If the exam is randomized the order of choice, this is what user input in after convert to the original order of the question',
      },
      rawAnswer: {
        type: Sequelize.STRING,
        comment: 'If the exam is randomized the order of choice, this is what user input in',
      },
      correct: {
        type: Sequelize.BOOLEAN,
      },
      flag: {
        type: Sequelize.BOOLEAN,
      },
      startTime: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('etExamAttemptQuestions');
  }
};