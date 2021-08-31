import { Resolver, Query, Root, Args, Arg, Ctx, FieldResolver } from 'type-graphql';
import { Tools } from '../../entity/Tools';
import { PaginationArgs } from '../types/PaginationArgs';
import { ToolsInput } from '../types/ToolsInput';
import { IGraphQLContext } from '../types/Context';
import { Ninja } from '../../entity/Ninja';

@Resolver(Tools)
export class ToolsResolver {
	@Query(() => [Tools])
	async tools(
		@Arg('filter', { nullable: true }) filter: ToolsInput,
		@Args() { startIndex, endIndex }: PaginationArgs,
		@Ctx() { prisma }: IGraphQLContext
	) {
		const tools = await prisma.tools.findMany({
			...(filter?.name && { where: { name: { contains: filter.name } } }),
			skip: startIndex,
			take: endIndex
		});

		return tools;
	}

	@FieldResolver(() => [Ninja])
	async ninjas(@Root() tools: Tools, @Ctx() { prisma }: IGraphQLContext) {
		const ninjas = await prisma.tools.findUnique({ where: { id: tools.id || undefined } }).ninjas();
		return ninjas;
	}
}
