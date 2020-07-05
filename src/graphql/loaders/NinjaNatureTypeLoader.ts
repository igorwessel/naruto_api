import DataLoader from 'dataloader';
import { NatureType } from '../../entity/NatureType';
import { getCustomRepository } from 'typeorm';
import { NinjaNatureTypeRepo } from '../../repos/NinjaNatureTypeRepo';
import { NinjaNaturetype } from '../../entity/Ninja';

type BatchNinjaNatureType = (ids: readonly number[]) => Promise<NatureType[][]>;

const batchNinjaNatureType: BatchNinjaNatureType = async (ids: readonly number[]) => {
	const ninjaNatureTypeRepo = getCustomRepository(NinjaNatureTypeRepo);

	const ninjaNatureType: NinjaNaturetype[] = await ninjaNatureTypeRepo
		.createQueryBuilder('ninja_naturetype')
		.innerJoinAndSelect('ninja_naturetype.nature_type', 'nature_type')
		.where('ninjaId IN (:...ids)', { ids })
		.getMany();

	const ninjaNatureTypeMap: { [key: number]: NatureType[] } = {};

	ninjaNatureType.forEach(naturetype => {
		if (!ninjaNatureTypeMap[naturetype.ninjaId]) {
			ninjaNatureTypeMap[naturetype.ninjaId] = [(naturetype as any).nature_type];
		} else {
			ninjaNatureTypeMap[naturetype.ninjaId].push((naturetype as any).nature_type);
		}
	});

	return ids.map(id => ninjaNatureTypeMap[id]);
};

export const ninjaNatureTypeLoader = () => new DataLoader<number, NatureType[]>(batchNinjaNatureType);
