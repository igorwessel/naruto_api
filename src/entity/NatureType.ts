import { BaseManyToMany } from '../shared/BaseManyToMany';
import { ObjectType, Field } from 'type-graphql';
import { Entity, OneToMany, OneToOne } from 'typeorm';
import { NinjaNaturetype } from './Ninja';
import { Jutsu } from './Jutsu';

@ObjectType()
@Entity()
export class NatureType extends BaseManyToMany {
	@Field(() => Boolean)
	affinity: Boolean;

	@OneToMany(type => NinjaNaturetype, ninjanaturetype => ninjanaturetype.nature_type)
	has_ninja: NatureType[];

	@OneToOne(type => Jutsu, jutsu => jutsu.nature_type)
	jutsu: Promise<Jutsu>;
}
