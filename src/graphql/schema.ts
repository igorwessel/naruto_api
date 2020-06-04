import { makeExecutableSchema } from 'graphql-tools';

const users_data: any[] = [
  {
    id: 1,
    name: 'Jon',
    email: 'jon@jon.com',
  },
  {
    id: 2,
    name: 'Ana',
    email: 'ana@ana.com',
  },
];

const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        allUsers: [User!]!
    }
`;

const resolvers = {
  Query: {
    allUsers: () => users_data,
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
