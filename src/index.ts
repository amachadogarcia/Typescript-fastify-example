/** Import main dependencies */
import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';

/** Import default data configuration */
import ROUTES from './config/routes';

/** Import all Routes */
import CustomServiceRoute from './routes/service';

/**
 * @description Create Fastify App.
 *
 * @author Estefania Barrera | estefaniabarrera
 */

/** Run the server! */
(async (): Promise<void> => {
	try {
		/** Create Fastify App */
		const app: FastifyInstance = fastify({
		});

		app.server.requestTimeout = 5000;

		/** Register all routes */
		app.register(fastifyCors, {
			origin: '*',
		});
		app.register(CustomServiceRoute, { prefix: ROUTES.test });

		// You must listen on all IPV4 addresses in Cloud Run
		const address = '0.0.0.0';
		await app.listen(Number(8082), '0.0.0.0');
		// eslint-disable-next-line no-console
		console.log(`server listening on ${address} with port 8082`);
	} catch (err) {
		console.error(err);
	}
})();
