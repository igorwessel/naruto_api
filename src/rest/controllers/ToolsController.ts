import { JsonController, Get, QueryParams, Param, OnUndefined, NotFoundError, UseBefore } from 'routing-controllers';
import { prisma } from '../../prisma';

import { treatmentName } from '../middlewares/HelpersMiddlewares';

import { NinjaNotFoundError } from '../errors/NinjaError';
import { AttributeNotFound } from '../errors/AttributesError';

import { NinjaWithAllRelations } from '../../shared/Ninja';
import { BaseQueryParams } from '../shared/BaseQueryParams';

@JsonController('/tools')
export class ToolsController {
	@Get('/')
	async getAll(@QueryParams({ required: false }) { limit, offset }: BaseQueryParams) {
		const tools = await prisma.tools.findMany({ skip: offset, take: limit });
		return tools;
	}

	@Get('/:id([0-9]+)')
	async getOneToolId(@Param('id') id: number) {
		const tool = await prisma.tools.findFirst({ where: { id } });
		return tool;
	}

	@Get('/:id([0-9]+)/ninjas')
	async getOneToolIdNninjas(@Param('id') id: number) {
		const ninjas = await prisma.tools.findUnique({ where: { id } }).ninjas();
		if (ninjas.length === 0) throw new NotFoundError("This tool don't have ninjas");
		return ninjas;
	}
}
