import DataLoader from 'dataloader';

import { getCustomRepository, In } from 'typeorm';
import { TeamRepo } from '../../repos/TeamRepo';
import { Team } from '../../entity/Team';
import { Affiliation } from '../../entity/Affiliation';

type BatchTeamAffiliation = (ids: readonly number[]) => Promise<Affiliation[][]>;

const batchTeamAffiliation: BatchTeamAffiliation = async (ids: readonly number[]) => {
	const teamRepo = getCustomRepository(TeamRepo);

	const teams: Team[] = await teamRepo.find({
		where: { id: In([ids]) },
		join: {
			alias: 'team',
			innerJoinAndSelect: {
				affiliation: 'team.affiliation'
			}
		}
	});

	const teamMap: { [key: number]: Affiliation[] } = {};

	teams.forEach(team => {
		if (!teamMap[team.id]) {
			teamMap[team.id] = [...(team as any).affiliation];
		} else {
			teamMap[team.id].push((team as any).affiliation);
		}
	});
	return ids.map(id => teamMap[id]);
};

export const teamAffiliationLoader = () => new DataLoader<number, Affiliation[]>(batchTeamAffiliation);
