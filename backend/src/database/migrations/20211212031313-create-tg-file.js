'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tgFiles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      service: {
        type: Sequelize.STRING
      },
      key: {
        type: Sequelize.STRING
      },
      originalName: {
        type: Sequelize.STRING
      },
      extension: {
        type: Sequelize.STRING
      },
      mimeType: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER,
      },
      meta: {
        type: Sequelize.TEXT,
      },
      ownerUserId: {
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
    await queryInterface.dropTable('tgFiles');
  }
};