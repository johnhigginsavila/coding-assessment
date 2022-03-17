'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('class', {
      classId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      studentId: { type: Sequelize.INTEGER },
      teacherId: { type: Sequelize.INTEGER },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('class');
  }
};
