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

	@Column('boolean', { nullable: true })
	affinity: Boolean;

	@Column('varchar', { nullable: true })
	only: string;

	@Column({ nullable: true })
	ninjaId: number;

	@Column({ nullable: true })
	natureTypeId: number;

	@ManyToOne(type => Ninja, ninja => ninja.has_nature_type)
	ninja: Promise<Ninja>;

	@Field(() => NatureType, { nullable: true })
	@ManyToOne(type => NatureType, nature_type => nature_type.has_ninja)
	nature_type: Promise<NatureType>;
}
