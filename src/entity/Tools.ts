import { ObjectType, Field } from 'type-graphql';
import { Ninja } from './Ninja';
import { BaseContent } from '../shared/BaseContent';

@ObjectType()
export class Tools extends BaseContent {
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

	@Field(() => Ninja, { nullable: true })
	ninjas: Ninja[];
}
