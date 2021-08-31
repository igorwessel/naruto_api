import { Prisma } from '@prisma/client';

const ninjaWithAllRelations = Prisma.validator<Prisma.NinjaArgs>()({
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

export type NinjaWithAllRelations = Prisma.NinjaGetPayload<typeof ninjaWithAllRelations>;
