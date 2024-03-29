import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import HomeRoute from './HomeRoute';
import createServer from '../tests/createServer';
// import '../tests/handlers';

createServer([
	{
		path: '/api/repositories',
		response: (req, _res, _ctx) => {
			const [, language] = req.url.searchParams
				.get('q')
				.split('language:');
			return {
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
			};
		},
	},
]);
const languages = ['javascript', 'typescript', 'rust', 'go', 'python', 'java'];

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
