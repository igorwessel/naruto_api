import { BaseManyToMany } from '../shared/BaseManyToMany';
import { ObjectType, Field } from 'type-graphql';
import { Entity, OneToMany, OneToOne, Column, ManyToOne } from 'typeorm';
import { NinjaNaturetype } from './Ninja';
import { Jutsu } from './Jutsu';

@ObjectType()
@Entity()
export class NatureType extends BaseManyToMany {
	@Field(() => Boolean)
	affinity: Boolean;

	@Field(() => Boolean)
	@Column()
	kekkei_genkai: Boolean;

	@Field(() => Boolean)
	@Column()
	kekkei_tota: Boolean;

	@OneToMany(type => NinjaNaturetype, ninjanaturetype => ninjanaturetype.nature_type)
	has_ninja: NatureType[];

	@OneToMany(type => Jutsu, jutsu => jutsu.nature_type)
	jutsu: Promise<Jutsu[]>;
}
