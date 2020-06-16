import DataLoader from 'dataloader';
import { getCustomRepository } from 'typeorm';
import { Family } from '../entity/Family';
import { FamilyRepo } from '../repos/FamilyRepo';

type BatchFamily = (ids: readonly number[]) => Promise<Family[][]>;

const batchFamily: BatchFamily = async (ids: readonly number[]) => {
	const familyRepo = getCustomRepository(FamilyRepo);

	const family: Family[] = await familyRepo
		.createQueryBuilder('family')
		.innerJoinAndSelect('family.parent_to', 'parent_to')
		.where('parentFromId IN (:...ids)', { ids })
		.getMany();

	const familyMap: { [key: number]: Family[] } = {};

	family.forEach(family => {
		if (!familyMap[family.parentFromId]) {
			familyMap[family.parentFromId] = [family as any];
		} else {
			familyMap[family.parentFromId].push(family as any);
		}
	});

	return ids.map(id => familyMap[id]);
};

export const ninjaFamilyLoader = () => new DataLoader<number, Family[]>(batchFamily);
