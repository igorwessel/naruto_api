import DataLoader from 'dataloader';
import { getCustomRepository, In } from 'typeorm';
import { Jutsu } from '../../entity/Jutsu';
import { JutsuRepo } from '../../repos/JutsuRepo';
import { ClassificationJutsu } from '../../entity/ClassificationJutsu';

type BatchJutsuClassification = (ids: readonly number[]) => Promise<ClassificationJutsu[][]>;

const batchJutsuClassification: BatchJutsuClassification = async (ids: readonly number[]) => {
	const jutsuRepo = getCustomRepository(JutsuRepo);

	const jutsus: Jutsu[] = await jutsuRepo.find({
		where: { id: In([ids]) },
		join: {
			alias: 'jutsu',
			innerJoinAndSelect: {
				classification: 'jutsu.classification'
			}
		}
	});

	const jutsuMap: { [key: number]: ClassificationJutsu[] } = {};

	jutsus.forEach(jutsu => {
		if (!jutsuMap[jutsu.id]) {
			jutsuMap[jutsu.id] = [...(jutsu as any).classification];
		} else {
			jutsuMap[jutsu.id].push((jutsu as any).classification);
		}
	});

	return ids.map(id => jutsuMap[id]);
};

export const jutsuClassificationLoader = () => new DataLoader<number, ClassificationJutsu[]>(batchJutsuClassification);
