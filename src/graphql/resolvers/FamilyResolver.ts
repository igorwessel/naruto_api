import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Ninja } from '../../entity/Ninja';
import { Family } from '../../entity/Family';

@Resolver(Family)
export class FamilyResolver {
	@FieldResolver(() => Ninja, { nullable: true })
	details(@Root() family: Family): Ninja {
		return family.parentFrom;
	}
}
