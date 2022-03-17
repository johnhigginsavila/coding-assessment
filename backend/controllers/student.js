const Promise = require('bluebird');
const _ = require('lodash');
const h = require('../helpers');

module.exports = (db) => {
    const { TeacherModel, StudentModel, ClassModel } = require('../models')(db);

    let StudentController = {};

    /**
	 * Get student by email
	 * @param {string} email
	 * @returns {Promise<any>}
	 */
     StudentController.getByEmail = async (email) => {
		const student = await StudentModel.findOne({ where: { email }, include: [TeacherModel] });
		return student;
	};

	/**
	 * Get students by emails
	 * @param {Array} emails
	 * @returns {Promise<any>}
	 */
     StudentController.getByEmails = async (emails) => {
		const students = await StudentModel.findAll({ where: { email: emails } });
		return students;
	};

    StudentController.getCommonStudents = async (teacherEmails) => {
        let teachers = await TeacherModel.findAll({ email: teacherEmails })
        teachers = teachers.map(t => t.toJSON()).map(t => t.teacherId)
        const students = await StudentModel.findAll({
            include: [
                {
                    model: TeacherModel,
                    where: {
                        email: teacherEmails
                    },
                }
            ]
        });

        const commonStudents = students
            .map(s => s.toJSON())
            .filter(s => {
                const teachersEmails = s.teachers.map(t => t.email)
                return teacherEmails.every(v => teachersEmails.includes(v));
            })

        return commonStudents
    };

    StudentController.notify = async (tutorEmail, notification) => {
        const studentEmails = h.general.extractTaggedEmails(notification);
        const tS = await StudentModel.findAll({
            attributes: ['email'],
            include: [
                {
                    model: TeacherModel,
                    where: {
                        email: tutorEmail
                    }
                }
            ]
        })

        const teacherStudents = tS.map(stu => stu.toJSON()).map(stu => stu.email)
        const allEmails = [...studentEmails, ...teacherStudents]

        return _.uniq(allEmails)
    }

    return StudentController;
};
