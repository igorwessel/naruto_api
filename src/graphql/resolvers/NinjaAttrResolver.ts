import { NinjaAttr } from '../../entity/NinjaAttr';
import { Resolver, FieldResolver, Root } from 'type-graphql';

@Resolver(NinjaAttr)
export class NinjaAttrResolver {
	@FieldResolver(() => String)
	season(@Root() ninjaAttr: NinjaAttr): String {
		return ninjaAttr.season.name;
	}
}
