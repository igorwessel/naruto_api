import DataLoader from 'dataloader';
import { getCustomRepository } from 'typeorm';
import { Ninja, NinjaTeam } from '../entity/Ninja';
import { NinjaTeamRepo } from '../repos/NinjaTeamRepo';

type BatchTeamLeaders = (ids: readonly number[]) => Promise<Ninja[][]>;

const batchTeamLeaders: BatchTeamLeaders = async (ids: readonly number[]) => {
	const ninjaTeamRepo = getCustomRepository(NinjaTeamRepo);

	const ninjas: NinjaTeam[] = await ninjaTeamRepo
		.createQueryBuilder('ninja_team')
		.innerJoinAndSelect('ninja_team.ninja', 'ninja')
		.where('teamId IN (:...ids)', { ids })
		.andWhere('leader = true')
		.getMany();

	const ninjaMap: { [key: number]: Ninja[] } = {};

	ninjas.forEach(ninja => {
		if (!ninjaMap[ninja.teamId]) {
			ninjaMap[ninja.teamId] = [(ninja as any).__ninja__];
		} else {
			ninjaMap[ninja.teamId].push((ninja as any).__ninja__);
		}
	});

	return ids.map(id => ninjaMap[id]);
};

export const teamLeadersLoader = () => new DataLoader<number, Ninja[]>(batchTeamLeaders);
