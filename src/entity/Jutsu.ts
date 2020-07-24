import { Entity, Column, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { BaseContent } from '../shared/BaseContent';
import { ObjectType, Field } from 'type-graphql';
import { NinjaJutsu } from './Ninja';
import { ClassificationJutsu } from './ClassificationJutsu';
import { NatureType } from './NatureType';
import { Class } from './Class';

@ObjectType()
@Entity()
export class Jutsu extends BaseContent {
	@Field({ nullable: true })
	@Column({ nullable: true })
	kanji: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	romaji: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	portugues: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	games: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	manga_panini: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	tv_brasileira: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	range: String;

	@Field({ nullable: true })
	@Column({ nullable: true })
	rank: String;

	@Field({ nullable: true })
	@Column('longtext', { nullable: true })
	hand_seals: String;

	@Field(() => NatureType, { nullable: true })
	nature: NatureType;

	@ManyToMany(type => NatureType)
	@JoinTable({ name: 'jutsu_naturetype' })
	nature_type: NatureType[];

	@OneToMany(type => NinjaJutsu, ninja_jutsu => ninja_jutsu.jutsu)
	has_ninja: NinjaJutsu[];

	@Field(type => ClassificationJutsu, { nullable: true })
	@ManyToMany(type => ClassificationJutsu)
	@JoinTable({ name: 'jutsu_classification' })
	classification: ClassificationJutsu[];

	@OneToMany(type => Jutsu, jutsu => jutsu.related_jutsu, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'relatedJutsuId' })
	related_jutsu_children: Jutsu[];

	@Field(type => Jutsu, { nullable: true })
	@ManyToOne(type => Jutsu, jutsu => jutsu.related_jutsu_children)
	related_jutsu: Jutsu;

	@Column({ nullable: true })
	relatedJutsuId: number;

	@Field(type => Jutsu, { nullable: true })
	@ManyToMany(type => Jutsu)
	@JoinTable({ name: 'jutsu_derived' })
	derived_jutsu: Jutsu[];

	@Field(type => Jutsu, { nullable: true })
	@ManyToMany(type => Jutsu)
	@JoinTable({ name: 'jutsu_parent' })
	parent_jutsu: Jutsu[];

	@Field(type => Class, { nullable: true })
	@ManyToMany(type => Class)
	@JoinTable({ name: 'jutsu_class' })
	class: Class[];
}
