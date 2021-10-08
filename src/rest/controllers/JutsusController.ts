import { JsonController, Get, QueryParams, Param, NotFoundError, UseBefore } from 'routing-controllers';
import { prisma } from '../../prisma';

import { treatmentName } from '../middlewares/HelpersMiddlewares';
import { BaseQueryParams } from '../shared/BaseQueryParams';

@JsonController('/jutsus')
export class ToolsController {
	@Get('/')
	async getAll(@QueryParams({ required: false }) { limit, offset }: BaseQueryParams) {
		const jutsus = await prisma.jutsu.findMany({
			skip: offset,
			take: limit,
			include: { class: true, classification: true, nature_type: true }
		});
		return jutsus;
	}

	@Get('/:id([0-9]+)')
	async getOneJutsuById(@Param('id') id: number) {
		const tool = await prisma.jutsu.findUnique({
			where: { id },
			include: { class: true, classification: true, nature_type: true }
		});
		if (!tool) throw new NotFoundError('Jutsu not found!');
		return tool;
	}

	@Get('/:id([0-9]+)/ninjas')
	async getOneJutsuIdByNinjas(@Param('id') id: number) {
		const ninjas = await prisma.jutsu.findUnique({ where: { id } }).ninja();
		if (!ninjas || ninjas.length === 0) throw new NotFoundError("This jutsu don't have ninjas");
		return ninjas;
	}

	@Get('/:name([a-z-]+)')
	@UseBefore(treatmentName)
	async getOneJutsuByName(@Param('name') name: string) {
		const jutsu = await prisma.jutsu.findFirst({
			where: { name: { contains: name } },
			include: { class: true, classification: true, nature_type: true }
		});

		if (!jutsu) throw new NotFoundError('Jutsu not found!');

		return jutsu;
	}

	@Get('/:name([a-z-]+)/ninjas')
	@UseBefore(treatmentName)
	async getOneJutsuByNameNinjas(@Param('name') name: string) {
		const ninjas = await prisma.jutsu.findFirst({ where: { name: { contains: name } } }).ninja();

		if (!ninjas || ninjas.length === 0) throw new NotFoundError("This jutsu don't have ninjas");

		return ninjas;
	}
}
