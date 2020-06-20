import { Resolver, Query, Root, Args } from 'type-graphql';
import { Tools } from '../entity/Tools';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ToolsRepo } from '../repos/ToolsRepo';
import { PaginationArgs } from '../shared/PaginationArgs';

@Resolver(Tools)
export class ToolsResolver {
	@InjectRepository(ToolsRepo)
	private readonly toolsRepo: ToolsRepo;

	@Query(() => [Tools])
	async tools(@Args() { startIndex, endIndex }: PaginationArgs): Promise<Tools[]> {
		const tools = await this.toolsRepo.find({ skip: startIndex, take: endIndex });

		return tools;
	}
}
