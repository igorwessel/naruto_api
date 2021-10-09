import { PrismaClient } from '.prisma/client';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
export interface IGraphQLContext {
	req: ExpressContext;
	prisma: PrismaClient;
}
