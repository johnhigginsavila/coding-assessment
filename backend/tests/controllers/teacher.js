const assert = require('chai').assert;

const dbConfig = require('../../config/config.json');
const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize(dbConfig.test);
const { db, TeacherModel, StudentModel } = require('../../models')(sequelize);

const TeacherController = require('../../controllers/teacher')(sequelize);

const TestTeachers = [];
const TestStudents = [];

describe('Controller > teacher tests', () => {
	before(async () => {
		await db.sync();
		TestTeachers.push(await TeacherModel.create({ email: 'hello@gmail.com' }));
		TestTeachers.push(await TeacherModel.create({ email: 'hello1@gmail.com' }));
		TestTeachers.push(await TeacherModel.create({ email: 'hello2@gmail.com' }));
		TestStudents.push(await StudentModel.create({ email: 'student1@gmail.com' }));
	})

	describe('getByEmail', async () => {
		it('passing in "hello@gmail.com" should return a teacher record', async () => {
			const teacher = await TeacherController.getByEmail(TestTeachers[0].email);
			assert.isNotNull(teacher);
			assert.typeOf(teacher, 'object');
			assert.strictEqual(teacher.email, TestTeachers[0].email);
		})
	})

	describe('getByEmails', async () => {
		it('passing in 2 valid teacher emails should return 2 teacher records', async () => {
			const teacherEmails = [TestTeachers[0].email, TestTeachers[1].email];
			const teachers = await TeacherController.getByEmails(teacherEmails);
			assert.isNotNull(teachers);
			assert.typeOf(teachers, 'array');
			assert.strictEqual(teachers[0].email, teacherEmails[0]);
		})
	})

	describe('registerStudentsByEmail', async () => {
		it('register unregistered students by accepting student emails', async () => {
			const studentEmails = ['student1@gmail.com', 'student2@gmail.com'];
			const registeredStudents = await TeacherController.registerStudentsByEmail(studentEmails);
			assert.isNotNull(registeredStudents);
			assert.typeOf(registeredStudents, 'array');
			assert.strictEqual(registeredStudents[0].email, studentEmails[0]);
		})
	})

	describe('enrollStudents', async () => {
		it('enrolls students to a class', async () => {
			const teacherId = TestTeachers[0].teacherId;
			const studentEmails = ['student1@gmail.com', 'student2@gmail.com'];
			const classes = await TeacherController.enrollStudents(teacherId, studentEmails);
			assert.isNotNull(classes);
			assert.typeOf(classes, 'array');
			assert.strictEqual(classes[0].teacherId, teacherId);
		})
	})

	describe('registerStudentsToTeacher', async () => {
		it('throws an error for invalid teacher email', async () => {
			try {
				await TeacherController.registerStudentsToTeacher('invalid_email');
			} catch (e) {
				assert.isNotNull(e);
			}
		})
		it('enrolls enrolled students to a class', async () => {
			const email = TestTeachers[0].email;
			const teacherId = TestTeachers[0].teacherId;
			const studentEmails = ['student1@gmail.com', 'student2@gmail.com'];
			const classes = await TeacherController.registerStudentsToTeacher(email, studentEmails);
			assert.isNotNull(classes);
			assert.typeOf(classes, 'array');
		})

		it('enrolls unenrolled students to a class', async () => {
			const email = TestTeachers[0].email;
			const teacherId = TestTeachers[0].teacherId;
			const studentEmails = ['student1@gmail.com', 'student2@gmail.com', 'student3@gmail.com'];
			const classes = await TeacherController.registerStudentsToTeacher(email, studentEmails);
			assert.isNotNull(classes);
			assert.typeOf(classes, 'array');
			assert.strictEqual(classes[0].teacherId, teacherId);
		})
	})

	after(async () => {
		await db.drop();
		await db.close();
	})
})
