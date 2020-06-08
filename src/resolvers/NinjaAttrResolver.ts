import { NinjaAttr } from '../entity/NinjaAttr';
import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Season } from '../entity/Season';

@Resolver(NinjaAttr)
export class NinjaAttrResolver {
	@FieldResolver(() => String)
	async season(@Root() ninjaAttr: NinjaAttr): Promise<String> {
		const season: Season = await ninjaAttr.season;

		return season.name;
	}
}
