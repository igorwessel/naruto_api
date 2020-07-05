import server from '../../src';

const ninjaKeysWithoutRelation = [
    'id',
    'name',
    'sex',
    'specie',
    'status',
    'academy_grad_age',
    'birthdate',
    'blood_type',
    'chunin_prom_age',
    'ninja_registration',
    'unique_traits'
]




const createTypeSchema = (type: string, properties: string[]) => 
`
        ${type} {
            ${properties.join('\n')}
        }
`

const typesSchema = {
    defaultManyToMany: (type: string) => createTypeSchema(type, ['id', 'name']),
    tools: createTypeSchema('tools', ['id', 'literal_english_name', 'name', 'description']),
    team: createTypeSchema('team', ['id', 'name', 'description']),
    ninja_attributes: createTypeSchema('ninja_attributes', ['age', 'height', 'weight', 'ninja_rank', 'season'])
}

const fragmentNinja = {
    withoutRelation: `
            fragment allPropertiesWithoutRelation on Ninja {
                id
                name
                sex
                specie
                status
                academy_grad_age
                birthdate
                blood_type
                chunin_prom_age
                ninja_registration
                unique_traits
            }`
};

const queryWithoutFragment = (query: string) => 
    `
        ${query}
    `;

const queryWithFragment = (query: string, fragment: string) =>
	`
        ${query}

        ${fragment}
    `;

    
const sendRequestGraphQL = async (chai: Chai.ChaiStatic, query: string) => {
    const res = await chai.request(await server)
            .post('/v1/graphql')
            .set('content-type', 'application/json')
            .send({ query });

	return res.body.data;
};

export { fragmentNinja, queryWithFragment, sendRequestGraphQL, ninjaKeysWithoutRelation, queryWithoutFragment, typesSchema };
