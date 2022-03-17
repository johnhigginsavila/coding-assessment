'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teacher', {
      teacherId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teacher');
  }
};
