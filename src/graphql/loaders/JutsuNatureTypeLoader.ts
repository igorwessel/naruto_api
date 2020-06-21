import DataLoader from 'dataloader';
import { getCustomRepository } from 'typeorm';
import { NatureType } from '../../entity/NatureType';
import { Jutsu } from '../../entity/Jutsu';
import { JutsuRepo } from '../../repos/JutsuRepo';

type BatchJutsuNatureType = (ids: readonly number[]) => Promise<NatureType[]>;

const batchJutsuNatureType: BatchJutsuNatureType = async (ids: readonly number[]) => {
	const jutsuRepo = getCustomRepository(JutsuRepo);

	const jutsus: Jutsu[] = await jutsuRepo
		.createQueryBuilder('jutsu')
		.innerJoinAndSelect('jutsu.nature_type', 'nature_type')
		.where('jutsu.id IN (:...ids)', { ids })
		.getMany();

	const jutsuMap: { [key: number]: NatureType } = {};

	jutsus.forEach(jutsu => {
		jutsuMap[jutsu.id] = (jutsu as any).nature_type;
	});

	return ids.map(id => jutsuMap[id]);
};

export const jutsuNatureTypeLoader = () => new DataLoader<number, NatureType>(batchJutsuNatureType);
