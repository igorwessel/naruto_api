import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Ninja } from './Ninja';
import { Tools } from '../Tools';

@Entity()
export class NinjaTools {
	@PrimaryGeneratedColumn()
	id: Number;

	@Column({ nullable: true })
	only: String;

	@ManyToOne(type => Ninja, ninja => ninja.tools)
	ninja: Promise<Ninja>;

	@ManyToOne(type => Tools, tools => tools.ninja_tools)
	tools: Promise<Tools>;
}
