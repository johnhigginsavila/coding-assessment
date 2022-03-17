const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const constant = require('../config/constant.json');

module.exports = (db) => {

  class Teacher extends Model {}
  class Student extends Model {}
  class Class extends Model {}

  Teacher.init({
    teacherId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'teacher',
    tableName: 'teacher'
  });

  Student.init({
      studentId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {
      sequelize: db,
      freezeTableName: true,
      modelName: 'student',
      tableName: 'student'
    });

  
  Class.init({
      classId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      teacherId: { type: Sequelize.INTEGER },
      studentId: { type: Sequelize.INTEGER },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {
      sequelize: db,
      freezeTableName: true,
      modelName: 'class',
      tableName: 'class'
    });


  Teacher.belongsToMany(Student, { through: 'class', foreignKey: 'teacherId' });
  Student.belongsToMany(Teacher, { through: 'class', foreignKey: 'studentId' })

  return {
    db,
    TeacherModel: Teacher,
    StudentModel: Student,
    ClassModel: Class
  }
}
