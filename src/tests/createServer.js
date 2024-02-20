import { rest } from 'msw';
import { setupServer } from 'msw/node';

const createServer = (handlerConfig) => {
	const handlers = handlerConfig.map((config) => {
		const { path, method = 'get', response } = config;
		return rest[method](path, (req, res, ctx) => {
			return res(ctx.json(response(req, res, ctx)));
		});
	});

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
};

export default createServer;
