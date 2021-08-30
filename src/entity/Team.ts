import { BaseManyToMany } from '../shared/BaseManyToMany';
import { ObjectType, Field } from 'type-graphql';
import { Ninja } from './Ninja';
import { Affiliation } from './Affiliation';
import { Jutsu } from './Jutsu';

@ObjectType()
export class Team extends BaseManyToMany {
	@Field({ nullable: true })
	description: String;

	@Field(() => Boolean)
	leader: Boolean;

	@Field(() => Ninja, { nullable: true })
	members: Ninja[];

	@Field(() => Ninja, { nullable: true })
	leaders: Ninja[];

	@Field(() => Affiliation, { nullable: true })
	affiliation: Affiliation[];

	@Field(() => Jutsu, { nullable: true })
	jutsu: Jutsu[];
}
