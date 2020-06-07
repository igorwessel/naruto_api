import { Entity, OneToMany } from 'typeorm';
import { NinjaTools } from './NinjaTools';
import { ObjectType } from 'type-graphql';
import { BaseContent } from '../shared/BaseContent';

@ObjectType()
@Entity()
export class Tools extends BaseContent {
	@OneToMany(type => NinjaTools, ninja_tools => ninja_tools.tools)
	ninja_tools: NinjaTools[];
}
