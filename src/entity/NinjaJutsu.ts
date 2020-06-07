import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Jutsu } from './Jutsu';
import { Ninja } from './Ninja';

@Entity()
export class NinjaJutsu {
	@PrimaryGeneratedColumn()
	id: Number;

	@Column()
	only: String;

	@ManyToOne(type => Jutsu, jutsu => jutsu.ninja_jutsu)
	jutsu: Promise<Jutsu>;

	@ManyToOne(type => Ninja, ninja => ninja.has_jutsu)
	ninja: Promise<Ninja>;
}
