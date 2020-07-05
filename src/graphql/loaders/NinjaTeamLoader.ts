import DataLoader from 'dataloader';
import { getCustomRepository } from 'typeorm';
import { Team } from '../../entity/Team';
import { NinjaTeam } from '../../entity/Ninja';
import { NinjaTeamRepo } from '../../repos/NinjaTeamRepo';

type BatchNinjaTeam = (ids: readonly number[]) => Promise<Team[][]>;

const batchNinjaTeam: BatchNinjaTeam = async (ids: readonly number[]) => {
	const ninjaTeamRepo = getCustomRepository(NinjaTeamRepo);

	const ninjaTeam: NinjaTeam[] = await ninjaTeamRepo
		.createQueryBuilder('ninja_team')
		.innerJoinAndSelect('ninja_team.team', 'team')
		.where('ninjaId IN (:...ids)', { ids })
		.getMany();

	const ninjaTeamMap: { [key: number]: Team[] } = {};

	ninjaTeam.forEach(ninjaTeam => {
		if (!ninjaTeamMap[ninjaTeam.ninjaId]) {
			ninjaTeamMap[ninjaTeam.ninjaId] = [(ninjaTeam as any).team];
		} else {
			ninjaTeamMap[ninjaTeam.ninjaId].push((ninjaTeam as any).team);
		}
	});

	return ids.map(id => ninjaTeamMap[id]);
};

export const ninjaTeamLoader = () => new DataLoader<number, Team[]>(batchNinjaTeam);
