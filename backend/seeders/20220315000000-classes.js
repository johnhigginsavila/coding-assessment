'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('class', [
        { classId: 1, teacherId: 1, studentId: 1, createdAt: new Date(), updatedAt: new Date() },
        { classId: 2, teacherId: 1, studentId: 2, createdAt: new Date(), updatedAt: new Date() },
        { classId: 3, teacherId: 2, studentId: 1, createdAt: new Date(), updatedAt: new Date() },
        { classId: 4, teacherId: 2, studentId: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('class', null, {});
  }
};
