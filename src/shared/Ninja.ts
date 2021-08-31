import { Prisma } from '@prisma/client';

// 1: Define a type that includes the relation to `Post`
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

// 3: This type will include a user and all their posts
export type NinjaWithAllRelations = Prisma.NinjaGetPayload<typeof ninjaWithAllRelations>;
