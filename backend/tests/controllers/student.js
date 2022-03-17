const assert = require('chai').assert;

const dbConfig = require('../../config/config.json');
const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize(dbConfig.test);
const { db, TeacherModel, StudentModel } = require('../../models')(sequelize);

const TeacherController = require('../../controllers/teacher')(sequelize);
const StudentController = require('../../controllers/student')(sequelize);
const TestTeachers = [];
const TestStudents = [];

describe('Controller > teacher tests', () => {
	before(async () => {
		await db.sync();
        TestTeachers.push(await TeacherModel.create({ email: 'hello@gmail.com' }));
		TestTeachers.push(await TeacherModel.create({ email: 'hello1@gmail.com' }));
		TestTeachers.push(await TeacherModel.create({ email: 'hello2@gmail.com' }));
		TestStudents.push(await StudentModel.create({ email: 'student1@gmail.com' }));
        TestStudents.push(await StudentModel.create({ email: 'student2@gmail.com' }));
        TestStudents.push(await StudentModel.create({ email: 'student3@gmail.com' }));
        TestStudents.push(await StudentModel.create({ email: 'student4@gmail.com' }));

        await TeacherController.registerStudentsToTeacher(TestTeachers[0].email, ['student1@gmail.com', 'student2@gmail.com', 'student3@gmail.com']);
        await TeacherController.registerStudentsToTeacher(TestTeachers[1].email, ['student1@gmail.com', 'student2@gmail.com']);
	})

	describe('getByEmail', async () => {
		it('passing in "student1@gmail.com" should return a teacher record', async () => {
			const student = await StudentController.getByEmail(TestStudents[0].email);
			assert.isNotNull(student);
			assert.typeOf(student, 'object');
			assert.strictEqual(student.email, TestStudents[0].email);
		})
	})

    describe('getByEmails', async () => {
		it('passing in 2 valid student emails should return 2 teacher records', async () => {
			const studentEmails = [TestStudents[0].email, TestStudents[1].email];
			const students = await StudentController.getByEmails(studentEmails);
			assert.isNotNull(students);
			assert.typeOf(students, 'array');
			assert.strictEqual(students[0].email, studentEmails[0]);
		})
	})

    describe('getCommonStudents', async () => {
        it('returns common students of given list of teacher emails', async () => {
            const teacherEmails = [TestTeachers[0].email, TestTeachers[1].email]
            const commonStudents = await StudentController.getCommonStudents(teacherEmails);
            assert.isNotNull(commonStudents);
            assert.typeOf(commonStudents, 'array');
			assert.strictEqual(commonStudents[0].email, TestStudents[0].email);
        })
    })

    describe('notify', async () => {
        it('returns notified students based on the notification mentions', async () => {
            const notification = 'Hello students! @student1@gmail.com @student2@gmail.com';
            const tutorEmail = TestTeachers[0].email;
            const emails = await StudentController.notify(tutorEmail, notification);
            assert.isNotNull(emails);
            assert.typeOf(emails, 'array');
            assert.deepEqual(emails, [ 'student1@gmail.com', 'student2@gmail.com', 'student3@gmail.com' ]);
        })
    })

	after(async () => {
		await db.drop();
		await db.close();
	})
})
