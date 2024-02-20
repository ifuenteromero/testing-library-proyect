import createServer from '../../tests/createServer';

// createServer() => GET api/user => { user: null }

createServer([
	{
		path: '/api/user',
		response: () => ({ user: null }),
	},
]);

test('when user is not signed in, sign in and sign up are visible ', async () => {
	console.log('test 1');
});
test('when user is not signed in, sign out is not visible ', async () => {
	console.log('test 2');
});

createServer([
	{
		path: '/api/user',
		response: () => ({ user: { id: 3, email: 'test@gmail.com' } }),
	},
]);

// createServer() => GET api/user => { user: { id: 2, email: test@gmail.com }l }
test('when user is signed in, sign in and sign up are not visible ', async () => {
	console.log('test 3');
});
test('when user is signed in, sign out is visible ', async () => {
	console.log('test 4');
});
