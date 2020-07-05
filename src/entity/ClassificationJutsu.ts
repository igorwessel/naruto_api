import { BaseManyToMany } from '../shared/BaseManyToMany';
import { Entity } from 'typeorm';
import { ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class ClassificationJutsu extends BaseManyToMany {}
