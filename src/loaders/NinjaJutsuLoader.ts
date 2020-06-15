import DataLoader from 'dataloader';
import { getCustomRepository } from 'typeorm';
import { Jutsu } from '../entity/Jutsu';
import { NinjaJutsuRepo } from '../repos/NinjaJutsuRepo';
import { NinjaJutsu } from '../entity/Ninja';

type BatchNinjaJutsu = (ids: readonly number[]) => Promise<Jutsu[][]>;

const batchNinjaJutsu: BatchNinjaJutsu = async (ids: readonly number[]) => {
	const ninjaJutsuRepo = getCustomRepository(NinjaJutsuRepo);

	const ninjaJutsu: NinjaJutsu[] = await ninjaJutsuRepo
		.createQueryBuilder('ninja_jutsu')
		.innerJoinAndSelect('ninja_jutsu.jutsu', 'jutsu')
		.where('ninjaId IN (:...ids)', { ids })
		.getMany();

	const ninjaJutsuMap: { [key: number]: Jutsu[] } = {};

	ninjaJutsu.forEach(ninjajutsu => {
		if (!ninjaJutsuMap[ninjajutsu.ninjaId]) {
			ninjaJutsuMap[ninjajutsu.ninjaId] = [(ninjajutsu as any).__jutsu__];
		} else {
			ninjaJutsuMap[ninjajutsu.ninjaId].push((ninjajutsu as any).__jutsu__);
		}
	});

	return ids.map(id => ninjaJutsuMap[id]);
};

export const ninjaJutsuLoader = () => new DataLoader<number, Jutsu[]>(batchNinjaJutsu);
