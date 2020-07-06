import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src';
import { ninja_without_relation } from '../mock/ninja'
import { sendRequest } from '../helpers';

chai.use(chaiHttp);

describe('REST: path /ninjas, method: GET', () => {

    it('/ninjas should return 15 ninjas', async () => {
        const res = await sendRequest(chai, 'ninjas')
        
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(15)
    })
    
})
