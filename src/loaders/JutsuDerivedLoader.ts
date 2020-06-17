import DataLoader from 'dataloader';
import { getCustomRepository, In } from 'typeorm';
import { Jutsu } from '../entity/Jutsu';
import { JutsuRepo } from '../repos/JutsuRepo';

type BatchJutsuDerived = (ids: readonly number[]) => Promise<Jutsu[][]>;

const batchJutsuDerived: BatchJutsuDerived = async (ids: readonly number[]) => {
	const jutsuRepo = getCustomRepository(JutsuRepo);

	const jutsus: Jutsu[] = await jutsuRepo.find({
		where: { id: In([ids]) },
		join: {
			alias: 'jutsu',
			innerJoinAndSelect: {
				derived_jutsu: 'jutsu.derived_jutsu'
			}
		}
	});

	const jutsuMap: { [key: number]: Jutsu[] } = {};

	jutsus.forEach(jutsu => {
		if (!jutsuMap[jutsu.id]) {
			jutsuMap[jutsu.id] = [...(jutsu as any).derived_jutsu];
		} else {
			jutsuMap[jutsu.id].push((jutsu as any).derived_jutsu);
		}
	});

	return ids.map(id => jutsuMap[id]);
};

export const jutsuDerivedLoader = () => new DataLoader<number, Jutsu[]>(batchJutsuDerived);
