import { BaseManyToMany } from '../shared/BaseManyToMany';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class KekkeiGenkai extends BaseManyToMany {
	@Field({ nullable: true })
	description: string;
}
