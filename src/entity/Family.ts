import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	ManyToMany,
	Tree,
	TreeParent,
	TreeChildren
} from 'typeorm';
import { Ninja } from './Ninja';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
@Tree('closure-table')
export class Family {
	@PrimaryGeneratedColumn()
	id: Number;

	@Field({ nullable: true })
	@Column('varchar', { length: 25 })
	relationship: String;

	@Field(() => Ninja, { name: 'details', nullable: true })
	details: Ninja;

	@ManyToOne(type => Ninja, ninja => ninja.family)
	@JoinColumn({ name: 'parent_from' })
	parent_from: Ninja;

	@ManyToOne(type => Ninja, ninja => ninja.id)
	@JoinColumn({ name: 'parent_to' })
	parent_to: Ninja;
}
