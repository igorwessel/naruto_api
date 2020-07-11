import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src';
import {
	ninjas,
	ninjasPage2,
	ninjaID91Family,
	ninjaID91Tools,
	ninjaID91Attributes,
	ninjaID91Jutsus,
	ninjaID91Teams,
	ninjaID91NatureType
} from '../mock/ninjas';
import { sendRequest } from '../helpers';

chai.use(chaiHttp);

describe('REST', () => {
	describe('path: /ninjas, method: GET', () => {
		describe('without route params', () => {
			it('/ninjas should return 15 ninjas', async () => {
				const res = await sendRequest(chai, 'ninjas');

				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.have.lengthOf(15);
				expect(res.body).to.eql(ninjas);
			});

			it('/ninjas?offset=15 with offset=15, should skip 15 ninjas and return next 15 ninjas', async () => {
				const res = await sendRequest(chai, 'ninjas', null, 'offset=15');

				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.have.lengthOf(15);
				expect(res.body).to.eql(ninjasPage2);
			});

			it('/ninjas?limit=30 with max limit (30) should return 30 ninjas', async () => {
				const res = await sendRequest(chai, 'ninjas', null, 'limit=30');

				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.have.lengthOf(30);
				expect(res.body).to.eql(ninjas.concat(ninjasPage2));
			});

			it('/ninjas?limit=35 exceed max limit 30, should return error', async () => {
				const res = await sendRequest(chai, 'ninjas', null, 'limit=35');

				const constraints = res.body.errors[0].constraints;
				expect(res).to.have.status(400);
				expect(res.body).to.haveOwnProperty('errors');
				expect(res.body.errors[0]).to.haveOwnProperty('constraints');
				expect(constraints).to.eql({ max: 'O maximo de ninjas é 30.' });
			});

			it('/ninjas?limit=0 dont be above the minimum, should return error', async () => {
				const res = await sendRequest(chai, 'ninjas', null, 'limit=0');

				const constraints = res.body.errors[0].constraints;
				expect(res).to.have.status(400);
				expect(res.body).to.haveOwnProperty('errors');
				expect(res.body.errors[0]).to.haveOwnProperty('constraints');
				expect(constraints).to.eql({ min: 'Precisa ter pelo menos 1 ninja a ser retornado' });
			});

			it('/ninjas/ without route param should return the first 15 ninjas', async () => {
				const res = await sendRequest(chai, 'ninjas', ' ');

				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.have.lengthOf(15);
				expect(res.body).to.eql(ninjas);
			});
		});

		describe('with route params', () => {
			it('/ninjas/1, should return ninja with ID 1', async () => {
				const res = await sendRequest(chai, 'ninjas', '1');

				expect(res).to.have.status(200);
				expect(res.body).to.be.an('object');
				expect(res.body).to.include({ id: 1 });
			});

			it('/ninjas/1/family, should return error because this ninja dont have family', async () => {
				const res = await sendRequest(chai, 'ninjas', '1/family');

				expect(res).to.have.status(404);
				expect(res.body).to.be.an('object');
				expect(res.body).to.include({ message: "This ninja don't have family." });
			});

			it('/ninjas/1/tools, should return error because this ninja dont have tools', async () => {
				const res = await sendRequest(chai, 'ninjas', '1/tools');

				expect(res).to.have.status(404);
				expect(res.body).to.be.an('object');
				expect(res.body).to.include({ message: "This ninja don't have tools." });
			});

			it('/ninjas/8/attributes, should return error because this ninja dont have attributes.', async () => {
				const res = await sendRequest(chai, 'ninjas', '8/attributes');

				expect(res).to.have.status(404);
				expect(res.body).to.be.an('object');
				expect(res.body).to.include({ message: 'This ninja dont have attributes.' });
			});

			it('/ninjas/1/jutsus, should return error because this ninja dont have jutsus', async () => {
				const res = await sendRequest(chai, 'ninjas', '1/jutsus');

				expect(res).to.have.status(404);
				expect(res.body).to.be.an('object');
				expect(res.body).to.include({ message: "This ninja don't have jutsus." });
			});

			it('/ninjas/1/teams, should return error because this ninja dont have teams', async () => {
				const res = await sendRequest(chai, 'ninjas', '1/teams');

				expect(res).to.have.status(404);
				expect(res.body).to.be.an('object');
				expect(res.body).to.include({ message: "This ninja don't have teams." });
			});

			it('/ninjas/1/nature_types, should return error because this ninja dont have nature types', async () => {
				const res = await sendRequest(chai, 'ninjas', '1/nature_types');

				expect(res).to.have.status(404);
				expect(res.body).to.be.an('object');
				expect(res.body).to.include({ message: "This ninja don't have nature type." });
			});

			it('/ninjas/91/family, should return the ninja family with ninja id 91', async () => {
				const res = await sendRequest(chai, 'ninjas', '91/family');

				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.eql(ninjaID91Family);
			});

			it('/ninjas/91/tools, should return the ninja tools with ninja id 91', async () => {
				const res = await sendRequest(chai, 'ninjas', '91/tools');

				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.eql(ninjaID91Tools);
			});

			it('/ninjas/91/attributes, should return the ninja attributes with ninja id 91', async () => {
				const res = await sendRequest(chai, 'ninjas', '91/attributes');

				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.eql(ninjaID91Attributes);
			});

			it('/ninjas/91/jutsus, should return the ninja jutsus with ninja id 91', async () => {
				const res = await sendRequest(chai, 'ninjas', '91/jutsus');

				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.eql(ninjaID91Jutsus);
			});

			it('/ninjas/91/teams, should return the ninja teams with ninja id 91', async () => {
				const res = await sendRequest(chai, 'ninjas', '91/teams');

				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.eql(ninjaID91Teams);
			});

			it('/ninjas/91/nature_types, should return the ninja nature types with ninja id 91', async () => {
				const res = await sendRequest(chai, 'ninjas', '91/nature_types');

				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.eql(ninjaID91NatureType);
			});
		});
	});
});
