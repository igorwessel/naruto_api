import DataLoader from 'dataloader';
import { getCustomRepository } from 'typeorm';
import { Jutsu } from '../entity/Jutsu';
import { JutsuRepo } from '../repos/JutsuRepo';

type BatchJutsuRelated = (ids: readonly number[]) => Promise<Jutsu[]>;

const batchJutsuRelated: BatchJutsuRelated = async (ids: readonly number[]) => {
	const jutsuRepo = getCustomRepository(JutsuRepo);

	const jutsus: Jutsu[] = await jutsuRepo
		.createQueryBuilder('jutsu')
		.innerJoinAndSelect('jutsu.related_jutsu', 'related_jutsu')
		.where('jutsu.id IN (:...ids)', { ids })
		.getMany();

	const jutsuMap: { [key: number]: Jutsu } = {};

	jutsus.forEach(jutsu => {
		jutsuMap[jutsu.id] = (jutsu as any).related_jutsu;
	});
	return ids.map(id => jutsuMap[id]);
};

export const jutsuRelatedLoader = () => new DataLoader<number, Jutsu>(batchJutsuRelated);
