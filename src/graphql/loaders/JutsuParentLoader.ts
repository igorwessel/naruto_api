import DataLoader from 'dataloader';
import { getCustomRepository, In } from 'typeorm';
import { Jutsu } from '../../entity/Jutsu';
import { JutsuRepo } from '../../repos/JutsuRepo';

type BatchJutsuParent = (ids: readonly number[]) => Promise<Jutsu[][]>;

const batchJutsuParent: BatchJutsuParent = async (ids: readonly number[]) => {
	const jutsuRepo = getCustomRepository(JutsuRepo);

	const jutsus: Jutsu[] = await jutsuRepo.find({
		where: { id: In([ids]) },
		join: {
			alias: 'jutsu',
			innerJoinAndSelect: {
				parent_jutsu: 'jutsu.parent_jutsu'
			}
		}
	});

	const jutsuMap: { [key: number]: Jutsu[] } = {};

	jutsus.forEach(jutsu => {
		if (!jutsuMap[jutsu.id]) {
			jutsuMap[jutsu.id] = [...(jutsu as any).parent_jutsu];
		} else {
			jutsuMap[jutsu.id].push((jutsu as any).parent_jutsu);
		}
	});

	return ids.map(id => jutsuMap[id]);
};

export const jutsuParentLoader = () => new DataLoader<number, Jutsu[]>(batchJutsuParent);
