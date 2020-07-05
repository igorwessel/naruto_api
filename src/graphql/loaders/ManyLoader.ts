import DataLoader from 'dataloader';
import { getCustomRepository, SelectQueryBuilder } from 'typeorm';
import { NinjaTools, Ninja } from '../../entity/Ninja';
import { NinjaToolsRepo } from '../../repos/NinjaToolsRepo';

interface BatchArgs {
	filter: any[];
	offset: number;
	limit: number;
}

type BatchManyLoader = (args: readonly BatchArgs[]) => Promise<Ninja[][]>;

const batchManyLoader: BatchManyLoader = async (args: readonly BatchArgs[]) => {
	const ninjaToolRepo = getCustomRepository(NinjaToolsRepo);
	const queryBuilder: SelectQueryBuilder<NinjaTools> = ninjaToolRepo.createQueryBuilder('ninja_tools');
	const relationsColumns = ['tools', 'nature_type', 'team', 'jutsus'];

	let { filter, offset, limit } = args[0];
	queryBuilder.innerJoinAndSelect('ninja_tools.ninja', 'ninja');
	queryBuilder.innerJoinAndSelect(`ninja_tools.tools`, 'tools');

	console.log(args);

	filter.forEach((arg: [string, string | number], index: number): void => {
		const column = arg[0];
		const parameter = arg[1];
		const haveLikeOperator = typeof parameter === 'string' && parameter.includes('%');
		const isRelationWithoutMainEntity = relationsColumns.some(relationColumn => column === relationColumn);

		if (isRelationWithoutMainEntity) {
			queryBuilder.where(`${column}.name ${haveLikeOperator ? 'like' : '='} :toolname`, { toolname: parameter });
		} else if (index === 0) {
			queryBuilder.where(`ninja.${column} ${haveLikeOperator ? 'like' : '='} :ninja${column}`, {
				['ninja' + column]: parameter
			});
		} else {
			queryBuilder.andWhere(`ninja.${column} ${haveLikeOperator ? 'like' : '='} :ninja${column}`, {
				['ninja' + column]: parameter
			});
		}
	});

	queryBuilder.skip(offset);
	queryBuilder.take(limit);

	const ninjaTool = await queryBuilder.getMany();

	console.log(ninjaTool);

	const ninjaToolMap: { [key: string]: Ninja[] } = {};

	ninjaTool.forEach(ninjaTool => {
		if (!ninjaToolMap[ninjaTool.ninjaId]) {
			ninjaToolMap[ninjaTool.ninjaId] = [(ninjaTool as any).__ninja__];
		} else {
			ninjaToolMap[ninjaTool.ninjaId].push((ninjaTool as any).__ninja__);
		}
	});

	console.log(ninjaToolMap);
	return args.map(field => Object.values(ninjaToolMap).flat());
};

export const manyLoader = () => new DataLoader<BatchArgs, Ninja[]>(batchManyLoader);
