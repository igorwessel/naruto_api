import { BaseManyToMany } from '../shared/BaseManyToMany';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class KekkeiGenkai extends BaseManyToMany {
	@Field({ nullable: true })
	@Column({ nullable: true })
	description: string;
}
