import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ninja } from './Ninja';
import { Season } from './Season';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class NinjaAttr {
	@PrimaryGeneratedColumn()
	id: Number;

	@Field({ nullable: true })
	@Column('varchar', { length: 30, nullable: true })
	age: String;

	@Field({ nullable: true })
	@Column('varchar', { length: 30, nullable: true })
	height: String;

	@Field({ nullable: true })
	@Column('varchar', { length: 30, nullable: true })
	weight: String;

	@Field({ nullable: true })
	@Column('varchar', { length: 30, nullable: true })
	ninja_rank: String;

	@ManyToOne(type => Ninja, ninja => ninja.ninja_has_attributes)
	ninja: Promise<Ninja>;
	// TODO: line below that, return the Type Season which he have ID,NAME of Season. is commented because i dont have sure if user want to know the id of season.
	// @Field(() => Season, { nullable: true })
	@ManyToOne(type => Season, season => season.ninja_has_attributes)
	season: Promise<Season>;
}
