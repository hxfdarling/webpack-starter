import { routes } from './router.config.js';
describe('routerConfig', () => {
	it('should add two numbers', () => {

		expect(routes.length).toBe(4);
	});

	it('should substract two numbers', () => {

		expect(routes[1].name).toBe("index");
	});
});