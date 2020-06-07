import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Ninja } from '../entity/Ninja';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Family } from '../entity/Family';
import { FamilyRepo } from '../repos/FamilyRepo';

@Resolver(Family)
export class FamilyResolver {
	@InjectRepository(FamilyRepo)
	private readonly familyRepo: FamilyRepo;

	@FieldResolver(() => Ninja, { nullable: true })
	async details(@Root() family: Family) {
		return family.parent_to;
	}
}
