const Promise = require('bluebird');
const _ = require('lodash');

module.exports = (db) => {
	const { TeacherModel, StudentModel, ClassModel } = require('../models')(db);

	let TeacherController = {};

	/**
	 * Get teacher by email
	 * @param {string} email
	 * @returns {Promise<any>}
	 */
	TeacherController.getByEmail = async (email) => {
		const teacher = await TeacherModel.findOne({ where: { email }, include: [StudentModel] });
		return teacher;
	};

	/**
	 * Get teachers by emails
	 * @param {Array} emails
	 * @returns {Promise<any>}
	 */
	TeacherController.getByEmails = async (emails) => {
		const teachers = await TeacherModel.findAll({ where: { email: emails } });
		return teachers;
	};

	TeacherController.registerStudentsByEmail = async (emails) => {
        const students = await Promise.mapSeries(emails, async (email) => {
            const student = await await StudentModel.findOne({ where: { email } });
            if (!student) {
                // create student
                return await StudentModel.create({ email })
            }
            return student
		})

        return students;
    };

    TeacherController.enrollStudents = async (teacherId, studentEmails) => {
        const registeredStudents = await TeacherController.registerStudentsByEmail(studentEmails);
        return await Promise.mapSeries(registeredStudents, async (student) => {
            student = student.toJSON();
            return await ClassModel.create({
                studentId: student.studentId,
                teacherId
            })
        })
    };

	/**
	 * Register students to teacher
	 * @param {string} teacherEmail
	 * @param {string} studentEmails
	 * @returns {Promise<void>}
	 */
	TeacherController.registerStudentsToTeacher = async (teacherEmail, studentEmails) => {
		const teacher = await TeacherController.getByEmail(teacherEmail);
		if (!teacher) throw {
			httpCode: 400,
			message: 'Invalid Teacher Email'
		}

		//TODO: add logic here to save student to teacher
		const enrolledStudents = teacher.students.map(student => student.toJSON());
		const unEnrolledStudents = studentEmails.filter(email => !_.find(enrolledStudents, (s) => s.email === email))
		if (unEnrolledStudents.length < 1) return [];
		return await TeacherController.enrollStudents(teacher.dataValues.teacherId, unEnrolledStudents);
	};

	return TeacherController;
}
