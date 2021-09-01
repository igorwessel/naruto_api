import { JsonController, Get, QueryParams, Param, NotFoundError, UseBefore } from 'routing-controllers';
import { prisma } from '../../prisma';

import { treatmentName } from '../middlewares/HelpersMiddlewares';
import { BaseQueryParams } from '../shared/BaseQueryParams';

@JsonController('/teams')
export class ToolsController {
	@Get('/')
	async getAll(@QueryParams({ required: false }) { limit, offset }: BaseQueryParams) {
		const teams = await prisma.team.findMany({
			skip: offset,
			take: limit,
			include: { affiliation: true }
		});
		return teams;
	}

	@Get('/:id([0-9]+)')
	async getOneTeamById(@Param('id') id: number) {
		const team = await prisma.team.findUnique({
			where: { id },
			include: { affiliation: true }
		});

		if (!team) throw new NotFoundError('Team not found!');

		return team;
	}

	@Get('/:id([0-9]+)/ninjas')
	async getOneTeamByIdNinjas(@Param('id') id: number) {
		const ninjas = await prisma.team.findUnique({ where: { id } }).ninja();
		if (!ninjas || ninjas.length === 0) throw new NotFoundError("This jutsu don't have ninjas");
		return ninjas;
	}

	@Get('/:name([0-9a-z-]+)')
	@UseBefore(treatmentName)
	async getOneTeamByName(@Param('name') name: string) {
		const team = await prisma.team.findFirst({
			where: { name: { contains: name } },
			include: { affiliation: true }
		});

		if (!team) throw new NotFoundError('Jutsu not found!');

		return team;
	}

	@Get('/:name([0-9a-z-]+)/ninjas')
	@UseBefore(treatmentName)
	async getOneJutsuByNameNinjas(@Param('name') name: string) {
		const ninjas = await prisma.team.findFirst({ where: { name: { contains: name } } }).ninja();

		if (!ninjas || ninjas.length === 0) throw new NotFoundError("This jutsu don't have ninjas");

		return ninjas;
	}
}
