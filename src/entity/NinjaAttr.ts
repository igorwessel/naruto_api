import { Field, ObjectType } from 'type-graphql';
import { Season } from './Season';

@ObjectType()
export class NinjaAttr {
	@Field({ nullable: true })
	age: string;

	@Field({ nullable: true })
	height: string;

	@Field({ nullable: true })
	weight: string;

	@Field({ nullable: true, name: 'ninja_rank' })
	ninjaRank: string;

	season: Season;
}
