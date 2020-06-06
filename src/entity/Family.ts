import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ninja } from './Ninja';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Family {
	@PrimaryGeneratedColumn()
	id: Number;

	@Field({ nullable: true })
	@Column('varchar', { length: 25 })
	relationship: String;

	@ManyToOne(type => Ninja, ninja => ninja.family)
	@JoinColumn({ name: 'parent_from' })
	parent_from: Ninja;

	@ManyToOne(type => Ninja, ninja => ninja.family)
	@JoinColumn({ name: 'parent_to' })
	parent_to: Ninja;
}
