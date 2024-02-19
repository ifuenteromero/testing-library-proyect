import { rest } from 'msw';
import { setupServer } from 'msw/node';

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
