import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Ninja } from './Ninja';
import { NatureType } from '../NatureType';

@ObjectType()
@Entity()
export class NinjaNaturetype {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column('boolean')
	affinity: Boolean;

	@Field({ nullable: true })
	@Column('varchar', { nullable: true })
	only: string;

	@ManyToOne(type => Ninja, ninja => ninja.has_nature_type)
	ninja: Promise<Ninja>;

	@Field(() => NatureType, { nullable: true })
	@ManyToOne(type => NatureType, nature_type => nature_type.has_ninja)
	nature_type: Promise<NatureType>;
}
