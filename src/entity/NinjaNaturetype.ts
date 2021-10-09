import { Field, ObjectType } from 'type-graphql';
import { NatureType } from './NatureType';

@ObjectType()
export class NinjaNaturetype {
	@Field()
	id: number;

	@Field(() => NatureType, { nullable: true })
	nature_type: Promise<NatureType>;
}
