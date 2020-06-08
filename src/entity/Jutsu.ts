import { Entity, Column, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { BaseContent } from '../shared/BaseContent';
import { ObjectType, Field } from 'type-graphql';
import { NinjaJutsu } from './Ninja';
import { ClassificationJutsu } from './ClassificationJutsu';
import { NatureType } from './NatureType';
import { type } from 'os';

@ObjectType()
@Entity()
export class Jutsu extends BaseContent {
	@Field({ nullable: true })
	@Column({ nullable: true })
	range: String;

	@Field({ nullable: true })
	@Column({ nullable: true })
	rank: String;

	@Field({ nullable: true })
	@Column({ nullable: true })
	hand_seals: String;

	@Field(() => NatureType, { nullable: true })
	nature: NatureType;

	@OneToOne(type => NatureType, nature_type => nature_type.jutsu)
	@JoinColumn()
	nature_type: NatureType;

	@OneToMany(type => NinjaJutsu, ninja_jutsu => ninja_jutsu.jutsu)
	has_ninja: NinjaJutsu[];

	@Field(type => ClassificationJutsu, { nullable: true })
	@ManyToMany(type => ClassificationJutsu)
	@JoinTable({ name: 'jutsu_classification' })
	classification: ClassificationJutsu[];

	@OneToOne(type => Jutsu, jutsu => jutsu.related_jutsu, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'relatedJutsuId' })
	related_jutsu_children: Jutsu;

	@Field(type => Jutsu, { nullable: true })
	@OneToOne(type => Jutsu, jutsu => jutsu.related_jutsu_children)
	related_jutsu: Jutsu;

	@Field(type => Jutsu, { nullable: true })
	@ManyToMany(type => Jutsu)
	@JoinTable({ name: 'jutsu_derived' })
	derived_jutsu: Jutsu[];

	@Field(type => Jutsu, { nullable: true })
	@ManyToMany(type => Jutsu)
	@JoinTable({ name: 'jutsu_parent' })
	parent_jutsu: Jutsu[];
}
