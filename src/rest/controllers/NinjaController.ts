import { JsonController, Get, QueryParams, Param, OnUndefined, NotFoundError, UseBefore } from 'routing-controllers';

import { NinjaQueryParams } from '../types/NinjaQueryParams';

import { NinjaNotFoundError } from '../errors/NinjaError';
import { AttributeNotFound } from '../errors/AttributesError';

import { NinjaWithAllRelations } from '../../shared/Ninja';

import { treatmentName } from '../middlewares/HelpersMiddlewares';

import { prisma } from '../../prisma';

@JsonController('/ninjas')
export class NinjaController {
	@Get('/')
	@OnUndefined(NinjaNotFoundError)
	async getAll(@QueryParams({ required: false }) { name, limit, offset, clan, sex }: NinjaQueryParams) {
		const ninjas = await prisma.ninja.findMany({
			skip: offset,
			take: limit,
			include: {
				occupation: true,
				affiliation: true,
				clan: true,
				classification: true,
				ninjaAttr: {
					select: {
						id: true,
						age: true,
						height: true,
						weight: true,
						ninjaRank: true,
						season: { select: { name: true } }
					}
				},
				jutsus: {
					include: { nature_type: true }
				},
				familyParentToIdToNinja: {
					select: {
						id: true,
						relationship: true,
						parentFrom: { select: { name: true } }
					}
				},
				tools: true,
				team: true
			}
		});

		return ninjas.map(({ familyParentToIdToNinja, ninjaAttr, ...ninja }: NinjaWithAllRelations) => ({
			...ninja,
			family: familyParentToIdToNinja,
			attributes: ninjaAttr
		}));
	}

	@Get('/:id([0-9]+)')
	@OnUndefined(NinjaNotFoundError)
	getNinjaByID(@Param('id') id: number) {
		return prisma.ninja.findUnique({
			where: { id },
			include: { occupation: true, affiliation: true, clan: true, classification: true, nature_type: true }
		});
	}

	@Get('/:id([0-9]+)/attributes')
	@OnUndefined(AttributeNotFound)
	async getAttributes(@Param('id') id: number) {
		const attributes = await prisma.ninja.findUnique({ where: { id } }).ninjaAttr({
			select: { id: true, age: true, height: true, weight: true, ninjaRank: true, season: { select: { name: true } } }
		});

		if (attributes.length === 0) throw new NotFoundError('This ninja dont have attributes.');

		return attributes;
	}

	@Get('/:id([0-9]+)/jutsus')
	async getJutsus(@Param('id') id: number) {
		const jutsus = await prisma.ninja.findUnique({ where: { id } }).jutsus({
			include: { nature_type: true }
		});

		if (jutsus.length === 0) throw new NotFoundError("This ninja don't have jutsus.");

		return jutsus;
	}

	@Get('/:id([0-9]+)/family')
	async getFamily(@Param('id') id: number) {
		const family = await prisma.ninja
			.findUnique({ where: { id } })
			.familyParentToIdToNinja({ select: { id: true, relationship: true, parentFrom: { select: { name: true } } } });

		if (family.length === 0) throw new NotFoundError("This ninja don't have family.");

		return family;
	}

	@Get('/:id([0-9]+)/tools')
	async getTools(@Param('id') id: number) {
		const tools = await prisma.ninja.findUnique({ where: { id } }).tools();

		if (tools.length === 0) throw new NotFoundError("This ninja don't have tools.");

		return tools;
	}

	@Get('/:id([0-9]+)/teams')
	async getTeams(@Param('id') id: number) {
		const teams = await prisma.ninja.findUnique({ where: { id } }).team();

		if (teams.length === 0) throw new NotFoundError("This ninja don't have teams.");

		return teams;
	}

	@Get('/:name([a-z]+(?:-[a-z]+))')
	@UseBefore(treatmentName)
	async getNinjaByName(@Param('name') name: string) {
		const ninja = await prisma.ninja.findFirst({
			where: { name: { contains: name } },
			include: { occupation: true, affiliation: true, clan: true, classification: true }
		});
		if (!ninja) throw new NinjaNotFoundError();

		return ninja;
	}

	@Get('/:name([a-z]+(?:-[a-z]+))/jutsus')
	@UseBefore(treatmentName)
	async getJutsusByNinjaName(@Param('name') name: string) {
		const jutsus = await prisma.ninja
			.findFirst({
				where: { name: { contains: name } }
			})
			.jutsus();

		if (jutsus.length === 0) throw new NotFoundError("This ninja don't have jutsus.");

		return jutsus;
	}

	@Get('/:name([a-z]+(?:-[a-z]+))/attributes')
	@UseBefore(treatmentName)
	async getAttributesByName(@Param('name') name: string) {
		const attributes = await prisma.ninja
			.findFirst({
				where: { name: { contains: name } }
			})
			.ninjaAttr({
				select: { id: true, age: true, height: true, weight: true, ninjaRank: true, season: { select: { name: true } } }
			});

		if (attributes.length === 0) throw new NotFoundError('This ninja dont have attributes.');

		return attributes;
	}

	@Get('/:name([a-z]+(?:-[a-z]+))/family')
	@UseBefore(treatmentName)
	async getFamilyByNinjaName(@Param('name') name: string) {
		const family = await prisma.ninja
			.findFirst({ where: { name: { contains: name } } })
			.familyParentToIdToNinja({ select: { id: true, relationship: true, parentFrom: { select: { name: true } } } });

		return family;
	}

	@Get('/:name([a-z]+(?:-[a-z]+))/tools')
	@UseBefore(treatmentName)
	async getToolsByName(@Param('name') name: string) {
		const tools = await prisma.ninja.findFirst({ where: { name: { contains: name } } }).tools();

		if (tools.length === 0) throw new NotFoundError("This ninja don't have tools.");

		return tools;
	}

	@Get('/:name([a-z]+(?:-[a-z]+))/teams')
	@UseBefore(treatmentName)
	async getTeamsByName(@Param('name') name: string) {
		const teams = await prisma.ninja.findFirst({ where: { name: { contains: name } } }).team();

		if (teams.length === 0) throw new NotFoundError("This ninja don't have teams.");

		return teams;
	}
}
