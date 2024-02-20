import createServer from '../../tests/createServer';

describe('when user is not signed in', () => {
	// createServer() => GET api/user => { user: null }

	createServer([
		{
			path: '/api/user',
			response: () => ({ user: null }),
		},
	]);

	test('sign in and sign up are visible', async () => {
		console.log('test 1');
	});
	test('sign out is not visible', async () => {
		console.log('test 2');
	});
});

describe('when user is signed in', () => {
	// createServer() => GET api/user => { user: { id: 2, email: test@gmail.com }l }

	createServer([
		{
			path: '/api/user',
			response: () => ({ user: { id: 3, email: 'test@gmail.com' } }),
		},
	]);

	test('sign in and sign up are not visible', async () => {
		console.log('test 3');
	});
	test('sign out is visible', async () => {
		console.log('test 4');
	});
});
