import { NinjaAttr } from '../entity/NinjaAttr';
import { Resolver, FieldResolver, Root } from 'type-graphql';

@Resolver(NinjaAttr)
export class NinjaAttrResolver {
	@FieldResolver(() => String)
	async season(@Root() ninjaAttr: NinjaAttr) {
		const season = (await ninjaAttr.season).name;

		return season;
	}
}
