import DataLoader from 'dataloader';
import { getCustomRepository } from 'typeorm';
import { NinjaAttr } from '../../entity/Ninja';
import { NinjaAttrRepo } from '../../repos/NinjaAttrRepo';

type BatchNinjaAttr = (ids: readonly number[]) => Promise<NinjaAttr[][]>;

const batchNinjaAttr: BatchNinjaAttr = async (ids: readonly number[]) => {
	const ninjaAttrRepo = getCustomRepository(NinjaAttrRepo);

	const ninjaAttr: NinjaAttr[] = await ninjaAttrRepo
		.createQueryBuilder('ninja_attr')
		.innerJoinAndSelect('ninja_attr.season', 'season')
		.where('ninjaId IN (:...ids)', { ids })
		.getMany();

	const ninjaAttrMap: { [key: number]: NinjaAttr[] } = {};

	ninjaAttr.forEach(ninjaAttr => {
		if (!ninjaAttrMap[ninjaAttr.ninjaId]) {
			ninjaAttrMap[ninjaAttr.ninjaId] = [ninjaAttr as any];
		} else {
			ninjaAttrMap[ninjaAttr.ninjaId].push(ninjaAttr as any);
		}
	});

	return ids.map(id => ninjaAttrMap[id]);
};

export const ninjaAttrLoader = () => new DataLoader<number, NinjaAttr[]>(batchNinjaAttr);
