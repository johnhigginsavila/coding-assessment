const express = require('express')
const router = express.Router()
const h = require('../helpers')

module.exports = (db) => {

	const TeacherController = require('../controllers/teacher')(db);
	const StudentsController = require('../controllers/student')(db);

	/**
	 * @api {post} /api/register
	 * @apiName RegisterStudentsToTeacher
	 * @apiVersion 1.0.0
	 * @apiGroup Api
	 * @apiDescription As a teacher, I want to register one or more students to a specified teacher.
	 * @apiParam {String} teacher Teacher's email address
	 * @apiParam {String[]} students Students' email addresses
	 */
	router.post('/register', async (req, res) => {
		try {
			const teacherEmail = req.body.teacher;
			const studentsEmails = req.body.students;

			if (!teacherEmail) throw new Error('Teacher missing');
			if (!studentsEmails || studentsEmails.length === 0) throw new Error('Students missing');

			await TeacherController.registerStudentsToTeacher(teacherEmail, studentsEmails);

			return h.api.createApiRes(req, res, 204, 'Students registered to teacher successfully');
		} catch (err) {
			const httpCode = err.httpCode || 500
			return h.api.createApiRes(req, res, httpCode, err.message);
		}
	});

	router.get('/getcommonsstudents', async (req, res) => {
		try {
			const tutor = req.query?.tutor;
			if (!tutor) {
				throw {
					httpCode: 400,
					message: 'Missing or Invalid Parameter Tutor'
				}
			}

			let teachers = Array.isArray(tutor) ? tutor : [tutor];

			teachers = teachers
				.map(String)
				.reduce((pv, cv) => {
					
					if (h.general.isValidEmail(cv)) pv.push(cv);
					return pv;
				}, [])

			if (teachers.length < 1) {
				throw {
					httpCode: 400,
					message: 'Missing or Invalid Parameter Tutor'
				}
			}

			const students = await StudentsController.getCommonStudents(teachers)

			return h.api.createApiRes(req, res, 200, null, { students });
		} catch (err) {
			const httpCode = err.httpCode || 500
			return h.api.createApiRes(req, res, httpCode, err.message);
		}
	})

	router.post('/retrievenotifications', async (req, res) => {
		try {
			const {
				tutor,
				notification
			} = req.body;

			if (!emailReg.test(tutor)) {
				throw {
					httpCode: 400,
					message: 'Invalid Parameter Tutor'
				}
			}

			const recepients = await StudentsController.notify(tutor, notification);
			
			return h.api.createApiRes(req, res, 200, null, { recepients });
		} catch (err) {
			const httpCode = err.httpCode || 500
			return h.api.createApiRes(req, res, httpCode, err.message);
		}
	})

	return router;

}
