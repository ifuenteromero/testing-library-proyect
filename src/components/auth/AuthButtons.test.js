import { render, screen } from '@testing-library/react';
import createServer from '../../tests/createServer';
import AuthButtons from './AuthButtons';
import { BrowserRouter } from 'react-router-dom';
// Añadido el debugger en el código se abre una pestaña de chrome y en la consola
// se ejecuta npm run:debug
// about:inspect

const renderComponent = async () => {
	render(
		<BrowserRouter>
			<AuthButtons />
		</BrowserRouter>
	);
	await screen.findAllByRole('link');
};

describe('when user is not signed in', () => {
	// createServer() => GET api/user => { user: null }

	createServer([
		{
			path: '/api/user',
			response: () => {
				console.log('NOT LOGGED IN');
				return { user: null };
			},
		},
	]);

	test('sign in and sign up are visible', async () => {
		await renderComponent();
		const signInButton = screen.getByRole('link', {
			name: /sign in/i,
		});
		const signUpButton = screen.getByRole('link', {
			name: /sign up/i,
		});
		expect(signInButton).toBeInTheDocument();
		expect(signInButton).toHaveAttribute('href', '/signin');
		expect(signUpButton).toBeInTheDocument();
		expect(signUpButton).toHaveAttribute('href', '/signup');
	});
	test('sign out is not visible', async () => {
		renderComponent();

		const signOutButton = screen.queryByRole('link', { name: /sign out/i });
		expect(signOutButton).not.toBeInTheDocument();
	});
});

const pause = () => new Promise((resolve) => setTimeout(resolve, 100));

describe('when user is signed in', () => {
	// createServer() => GET api/user => { user: { id: 2, email: test@gmail.com }l }

	createServer([
		{
			path: '/api/user',
			response: () => {
				console.log('LOGGED IN');
				return { user: { id: 3, email: 'test@gmail.com' } };
			},
		},
	]);

	test('sign in and sign up are not visible', async () => {
		await renderComponent();
		const signInButton = screen.queryByRole('link', { name: /sign in/i });
		const signUpButton = screen.queryByRole('link', { name: /sign up/i });
		expect(signInButton).not.toBeInTheDocument();
		expect(signUpButton).not.toBeInTheDocument();
	});
	test('sign out is visible', async () => {
		await renderComponent();
		const signOutButton = screen.getByRole('link', { name: /sign out/i });
		expect(signOutButton).toBeInTheDocument();
		expect(signOutButton).toHaveAttribute('href', '/signout');
	});
});
