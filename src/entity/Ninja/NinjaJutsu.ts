import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Jutsu } from '../Jutsu';
import { Ninja } from './Ninja';

@Entity()
export class NinjaJutsu {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	only: string;

	@Column({ nullable: true })
	jutsuId: number;

	@Column({ nullable: true })
	ninjaId: number;

	@ManyToOne(type => Jutsu, jutsu => jutsu.has_ninja)
	jutsu: Jutsu;

	@ManyToOne(type => Ninja, ninja => ninja.has_jutsu)
	ninja: Ninja;
}
