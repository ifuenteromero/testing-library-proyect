import { render, screen, within } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router';
import HomeRoute from './HomeRoute';

const languages = ['javascript', 'typescript', 'rust', 'go', 'python', 'java'];

const handlers = [
	rest.get('/api/repositories', (req, res, ctx) => {
		const [, language] = req.url.searchParams.get('q').split('language:');
		return res(
			ctx.json({
				items: [
					{
						id: 10270250,
						full_name: `${language}_first repo`,
					},
					{
						id: 126577260,
						full_name: `${language}_second repo`,
					},
				],
			})
		);
	}),
];

const server = setupServer(...handlers);

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});

test('renders 2 links for each language', async () => {
	render(
		<MemoryRouter>
			<HomeRoute />
		</MemoryRouter>
	);

	for (const lang of languages) {
		const links = await screen.findAllByRole('link', {
			name: new RegExp(`${lang}_`),
		});
		expect(links).toHaveLength(2);
		const [firstLink, secondLink] = links;
		expect(firstLink).toHaveTextContent(`${lang}_first repo`);
		expect(secondLink).toHaveTextContent(`${lang}_second repo`);
		expect(firstLink).toHaveAttribute(
			'href',
			`/repositories/${lang}_first repo`
		);
		expect(secondLink).toHaveAttribute(
			'href',
			`/repositories/${lang}_second repo`
		);
	}
});

const pause = () =>
	new Promise((resolve) => {
		setTimeout(resolve, 100);
	});
