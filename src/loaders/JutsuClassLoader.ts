import DataLoader from 'dataloader';
import { getCustomRepository, In } from 'typeorm';
import { NatureType } from '../entity/NatureType';
import { Jutsu } from '../entity/Jutsu';
import { JutsuRepo } from '../repos/JutsuRepo';
import { Class } from '../entity/Class';

type BatchJutsuClass = (ids: readonly number[]) => Promise<Class[][]>;

const batchJutsuClass: BatchJutsuClass = async (ids: readonly number[]) => {
	const jutsuRepo = getCustomRepository(JutsuRepo);

	const jutsus: Jutsu[] = await jutsuRepo.find({
		where: { id: In([ids]) },
		join: {
			alias: 'jutsu',
			innerJoinAndSelect: {
				class: 'jutsu.class'
			}
		}
	});

	const jutsuMap: { [key: number]: Class[] } = {};

	jutsus.forEach(jutsu => {
		if (!jutsuMap[jutsu.id]) {
			jutsuMap[jutsu.id] = [...(jutsu as any).class];
		} else {
			jutsuMap[jutsu.id].push((jutsu as any).class);
		}
	});

	return ids.map(id => jutsuMap[id]);
};

export const jutsuClassLoader = () => new DataLoader<number, Class[]>(batchJutsuClass);
