import { BaseManyToMany } from '../shared/BaseManyToMany';
import { ObjectType, Field } from 'type-graphql';
import { Entity, OneToMany } from 'typeorm';
import { NinjaNaturetype } from './NinjaNaturetype';

@ObjectType()
@Entity()
export class NatureType extends BaseManyToMany {
	@Field(() => Boolean)
	affinity: Boolean;

	@OneToMany(type => NinjaNaturetype, ninjanaturetype => ninjanaturetype.nature_type)
	has_ninja: NatureType[];
}
