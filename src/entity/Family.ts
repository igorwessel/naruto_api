import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ninja } from './Ninja';

@Entity()
export class Family {
	@PrimaryGeneratedColumn()
	id: Number;

	@Column('varchar', { length: 25 })
	relationship: String;

	@ManyToOne(type => Ninja, ninja => ninja.family)
	@JoinColumn({ name: 'parent_from' })
	parent_from: Ninja;

	@ManyToOne(type => Ninja, ninja => ninja.family)
	@JoinColumn({ name: 'parent_to' })
	parent_to: Ninja;
}
