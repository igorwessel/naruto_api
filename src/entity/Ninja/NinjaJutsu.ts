import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Jutsu } from '../Jutsu';
import { Ninja } from './Ninja';

@Entity()
export class NinjaJutsu {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	only: string;

	@ManyToOne(type => Jutsu, jutsu => jutsu.has_ninja)
	jutsu: Promise<Jutsu>;

	@ManyToOne(type => Ninja, ninja => ninja.has_jutsu)
	ninja: Promise<Ninja>;
}
