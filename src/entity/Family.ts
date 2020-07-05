import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ninja } from './Ninja/Ninja';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Family {
	@PrimaryGeneratedColumn()
	id: Number;

	@Field({ nullable: true })
	@Column('varchar', { length: 100 })
	relationship: String;

	@Field(() => Ninja, { name: 'details', nullable: true })
	details: Ninja;

	@Column({ nullable: true })
	parentFromId: number;

	@Column({ nullable: true })
	parentToId: number;

	@ManyToOne(type => Ninja, ninja => ninja.family)
	@JoinColumn()
	parent_from: Ninja;

	@ManyToOne(type => Ninja, ninja => ninja.id)
	@JoinColumn()
	parent_to: Ninja;
}
