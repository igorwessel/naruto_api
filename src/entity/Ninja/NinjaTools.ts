import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Ninja } from './Ninja';
import { Tools } from '../Tools';

@Entity()
export class NinjaTools {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	only: string;

	@Column({ nullable: true })
	ninjaId: number;

	@Column({ nullable: true })
	toolsId: number;

	@ManyToOne(type => Ninja, ninja => ninja.tools)
	ninja: Promise<Ninja>;

	@ManyToOne(type => Tools, tools => tools.ninja_tools)
	tools: Promise<Tools>;
}
