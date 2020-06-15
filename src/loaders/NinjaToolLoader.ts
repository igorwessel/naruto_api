import DataLoader from 'dataloader';
import { Tools } from '../entity/Tools';
import { getCustomRepository } from 'typeorm';
import { NinjaTools } from '../entity/Ninja';
import { NinjaToolsRepo } from '../repos/NinjaToolsRepo';

type BatchTool = (ids: readonly number[]) => Promise<Tools[][]>;

const batchNinjaTool: BatchTool = async (ids: readonly number[]) => {
	const ninjaToolRepo = getCustomRepository(NinjaToolsRepo);

	const ninjaTool: NinjaTools[] = await ninjaToolRepo
		.createQueryBuilder('ninja_tools')
		.innerJoinAndSelect('ninja_tools.tools', 'tools')
		.where('ninjaId IN (:...ids)', { ids })
		.getMany();

	const ninjaToolMap: { [key: number]: Tools[] } = {};

	ninjaTool.forEach(ninjaTool => {
		if (!ninjaToolMap[ninjaTool.ninjaId]) {
			ninjaToolMap[ninjaTool.ninjaId] = [(ninjaTool as any).__tools__];
		} else {
			ninjaToolMap[ninjaTool.ninjaId].push((ninjaTool as any).__tools__);
		}
	});

	return ids.map(id => ninjaToolMap[id]);
};

export const ninjaToolLoader = () => new DataLoader<number, Tools[]>(batchNinjaTool);
