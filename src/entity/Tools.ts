import { Entity, OneToMany, Column } from 'typeorm';
import { NinjaTools } from './Ninja';
import { ObjectType, Field } from 'type-graphql';
import { BaseContent } from '../shared/BaseContent';

@ObjectType()
@Entity()
export class Tools extends BaseContent {
	@Field()
	@Column({ nullable: true })
	kanji: string;

	@Field()
	@Column({ nullable: true })
	romaji: string;

	@Field()
	@Column({ nullable: true })
	portugues: string;

	@Field()
	@Column({ nullable: true })
	games: string;

	@Field()
	@Column({ nullable: true })
	manga_panini: string;

	@Field()
	@Column({ nullable: true })
	tv_brasileira: string;

	@OneToMany(type => NinjaTools, ninja_tools => ninja_tools.tools)
	ninja_tools: NinjaTools[];
}
