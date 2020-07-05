import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { 
    fragmentNinja, 
    queryWithFragment, 
    ninjaKeysWithoutRelation, 
    sendRequestGraphQL, 
    queryWithoutFragment, 
    typesSchema } from '../helpers';
import { ninja_without_relation } from '../mock/ninja'

chai.use(chaiHttp);

const querySingleOne = (filter: string, properties?: string) => 
    `
    { 
        ninja (
            filter: { 
                ${filter}
            } 
        ) {
            ${properties ? properties : '...allPropertiesWithoutRelation' } 
        }
    }
    `


describe("GraphQL: query ninja (should return one ninja), Ninja Type", () => {
    it('Gets all fields without relation', async () => {
        const query = queryWithFragment(querySingleOne('id: 91'), fragmentNinja.withoutRelation)
        
        const { ninja } = await sendRequestGraphQL(chai, query)

        expect(ninja).to.be.an('object')
        expect(Object.keys(ninja)).to.deep.equal(ninjaKeysWithoutRelation)
    })

    it('Get one ninja by id without relation', async () => {
        const query = queryWithFragment(querySingleOne('id: 91'), fragmentNinja.withoutRelation)
        
        const { ninja } = await sendRequestGraphQL(chai, query)

        expect(ninja).to.deep.equal(ninja_without_relation)
    })

    it('Get one ninja by name without relation, search with exact name', async () => {
        const query = queryWithFragment(querySingleOne('name: "Boruto Uzumaki"'), fragmentNinja.withoutRelation)
        
        const { ninja } = await sendRequestGraphQL(chai, query)
        
        expect(ninja).to.deep.equal(ninja_without_relation)
    })

    it('Get one ninja by name without relation, search with partial name', async () => {
        const query = queryWithFragment(querySingleOne('name: "%Boru%"'), fragmentNinja.withoutRelation)
        
        const { ninja } = await sendRequestGraphQL(chai, query)
        
        expect(ninja).to.deep.equal(ninja_without_relation)
    })

    it('Get a Occupation type', async () => {
        const type = 'occupation'

        const query = queryWithoutFragment(querySingleOne('id: 91', typesSchema.defaultManyToMany(type)))

        const { ninja } = await sendRequestGraphQL(chai, query)

        expect(ninja).to.haveOwnProperty(type)

        expect(ninja[type]).to.be.an('array')
    })

    it('Get a Affiliation type', async () => {
        const type = 'affiliation'

        const query = queryWithoutFragment(querySingleOne('id: 91', typesSchema.defaultManyToMany(type)))

        const { ninja } = await sendRequestGraphQL(chai, query)

        expect(ninja).to.haveOwnProperty(type)
        
        expect(ninja[type]).to.be.an('array')
    })

    it('Get a Classification type', async () => {
        const type = 'classification'

        const query = queryWithoutFragment(querySingleOne('id: 91', typesSchema.defaultManyToMany(type)))

        const { ninja } = await sendRequestGraphQL(chai, query)

        expect(ninja).to.haveOwnProperty(type)
        
        expect(ninja[type]).to.be.an('array')
    })

    it('Get a Clan type', async () => {
        const type = 'clan'

        const query = queryWithoutFragment(
            querySingleOne('id: 91', typesSchema.defaultManyToMany(type))
        )

        const { ninja } = await sendRequestGraphQL(chai, query)

        expect(ninja).to.haveOwnProperty(type)
        
        expect(ninja[type]).to.be.an('array')
    })

    it('Get a Tool type', async () => {
        const type = 'tools'

        const query = queryWithoutFragment(
            querySingleOne('id: 91', typesSchema[type])
        )

        const { ninja } = await sendRequestGraphQL(chai, query)

        expect(ninja).to.haveOwnProperty(type)

        expect(ninja[type]).to.be.an('array')
    })

    it('Get a Team type', async () => {
        const type = 'team'

        const query = queryWithoutFragment(
            querySingleOne('id: 91', typesSchema[type])
        )

        const { ninja } = await sendRequestGraphQL(chai, query)

        expect(ninja).to.haveOwnProperty(type)
        
        expect(ninja[type]).to.be.an('array')
    })

    it('Get a Ninja Attributes type', async () => {
        const type = 'ninja_attributes'

        const query = queryWithoutFragment(
            querySingleOne('id: 91', typesSchema[type])
        )

        const { ninja } = await sendRequestGraphQL(chai, query)

        expect(ninja).to.haveOwnProperty(type)

        expect(ninja[type]).to.be.an('array')
    })

})