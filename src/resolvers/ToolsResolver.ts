import { Resolver, Query, Root, Args, Arg } from 'type-graphql';
import { Tools } from '../entity/Tools';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ToolsRepo } from '../repos/ToolsRepo';
import { PaginationArgs } from '../shared/PaginationArgs';
import { ToolsInput } from '../types/ToolsInput';

@Resolver(Tools)
export class ToolsResolver {
	@InjectRepository(ToolsRepo)
	private readonly toolsRepo: ToolsRepo;

	@Query(() => [Tools])
	async tools(
		@Arg('filter', { nullable: true }) filter: ToolsInput,
		@Args() { startIndex, endIndex }: PaginationArgs
	): Promise<Tools[]> {
		const tools = await this.toolsRepo.find({ skip: startIndex, take: endIndex });

		return tools;
	}
}
