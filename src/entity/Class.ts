import { Entity } from 'typeorm';
import { BaseManyToMany } from '../shared/BaseManyToMany';
import { ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Class extends BaseManyToMany {}
