const assert = require('chai').assert;
const h = require('../../helpers');

describe('Helpers tests', () => {

	describe('reduceArrayToObject', () => {
		it('should return an object', () => {
			const testArray = [
				{ test: 'test', foo: 'bar' },
				{ test: 'test1', foo: 'bar1' }
			]
			const result = h.general.reduceArrayToObject('test', testArray)
			assert.deepEqual(result, {
				test: { test: 'test', foo: 'bar' },
				test1: { test: 'test1', foo: 'bar1' }
			})
		})

		it('should return an empty object', () => {
			const testArray = [
				{ test: 'test', foo: 'bar' },
				{ test: 'test1', foo: 'bar1' }
			]
			const result = h.general.reduceArrayToObject('not_test', testArray)
			assert.deepEqual(result, {})
		})

		it('should return an empty object', () => {
			const testArray = [
				{ test: 'test', foo: 'bar' },
				{ test: 'test1', foo: 'bar1' }
			]
			const result = h.general.reduceArrayToObject(null, testArray)
			assert.deepEqual(result, {})
		})
	})

	describe('isValidEmail', () => {
		it('should return true for registrations@yourpave.com', () => {
			const email = 'registrations@yourpave.com';
			const result = h.general.isValidEmail(email);
			assert.isNotNull(result);
			assert.typeOf(result, 'boolean');
			assert.strictEqual(result, true);
		});

		it('should return false for invalid_email', () => {
			const email = 'invalid_email';
			const result = h.general.isValidEmail(email);
			assert.isNotNull(result);
			assert.typeOf(result, 'boolean');
			assert.strictEqual(result, false);
		});
	});

	describe('extractTaggedEmails on string with 2 email addresses', () => {
		it('should return 2 email addresses', () => {
			const str = 'Hello students! @student1@gmail.com @student2@gmail.com';
			const emails = h.general.extractTaggedEmails(str);
			assert.isNotNull(emails);
			assert.typeOf(emails, 'array');
			assert.strictEqual(emails[0], 'student1@gmail.com');
			assert.strictEqual(emails[1], 'student2@gmail.com');
		});

		it('should return 0 email addresses', () => {
			const str = null;
			const emails = h.general.extractTaggedEmails(str);
			assert.isNotNull(emails);
			assert.typeOf(emails, 'array');
			assert.equal(emails.length, 0);
		});

		it('should return 2 email addresses', () => {
			const str = 'Hello students! @invalid_email';
			const emails = h.general.extractTaggedEmails(str);
			assert.isNotNull(emails);
			assert.typeOf(emails, 'array');
			assert.equal(emails.length, 0);
		});
	});

});
