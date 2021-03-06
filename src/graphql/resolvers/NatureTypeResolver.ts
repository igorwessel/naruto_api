import { Resolver, FieldResolver, Root } from 'type-graphql';
import { NatureType } from '../../entity/NatureType';

@Resolver(NatureType)
export class NatureTypeResolver {
	@FieldResolver()
	async affinity(@Root() natureType: NatureType): Promise<Boolean> {
		const { affinity }: { affinity: Boolean } = natureType.has_ninja[0];

		return affinity;
	}
}
