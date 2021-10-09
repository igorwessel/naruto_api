import { BaseContent } from '../shared/BaseContent';
import { ObjectType, Field } from 'type-graphql';
import { ClassificationJutsu } from './ClassificationJutsu';
import { NatureType } from './NatureType';
import { Class } from './Class';

@ObjectType()
export class Jutsu extends BaseContent {
	@Field({ nullable: true })
	kanji: string;

	@Field({ nullable: true })
	romaji: string;

	@Field({ nullable: true })
	portugues: string;

	@Field({ nullable: true })
	games: string;

	@Field({ nullable: true })
	manga_panini: string;

	@Field({ nullable: true })
	tv_brasileira: string;

	@Field({ nullable: true })
	range: String;

	@Field({ nullable: true })
	rank: String;

	@Field({ nullable: true })
	hand_seals: String;

	@Field(() => NatureType, { nullable: true, name: 'nature' })
	nature_type: NatureType[];

	@Field(() => ClassificationJutsu, { nullable: true })
	classification: ClassificationJutsu[];

	@Field(() => Class, { nullable: true })
	class: Class[];
}
