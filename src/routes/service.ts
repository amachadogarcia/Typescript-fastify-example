/** Import main dependencies */
import { FastifyInstance } from 'fastify';

const CustomServiceRoute = (app: FastifyInstance, opts: any, done: () => void): void => {
	/**
	 * Set Route into Fastify App with POST method and three middleware
	 * for dispatcher.
	 */
	app.route({
		method: 'POST',
		url: '/',
		async onRequest(request: any, reply: any) {
			console.log("onRequest");
		},
		preParsing: async (request: any, reply: any) => {
			console.log("preParsing");
		},
		preHandler: async (request: any, reply: any) => {
			await new Promise(f => setTimeout(f, 10000));
			console.log("preHandler");
		},
		handler: async (request: any, reply: any) => {
			console.log("handler");
			reply.code(200).send({
				message: "Successful"
			});
		},
		preSerialization: async (request: any, reply: any, payload: any) => {
			console.log("preSerialization");
			reply.sent = true;
		},
		onResponse: async (request: any, reply: any) => {
			console.log("onResponse");
		},
	});
	done();
};

export default CustomServiceRoute;
