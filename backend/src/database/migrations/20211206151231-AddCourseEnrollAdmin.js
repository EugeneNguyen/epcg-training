'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'etCourseEnrolls',
      'isCourseAdmin',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        after: "isActive"
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('etCourseEnrolls', 'isCourseAdmin');
  }
};
