import { BaseManyToMany } from '../shared/BaseManyToMany';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class NatureType extends BaseManyToMany {
	@Field(() => Boolean)
	affinity: Boolean;

	@Field(() => Boolean)
	kekkei_genkai: Boolean;

	@Field(() => Boolean)
	kekkei_tota: Boolean;
}
