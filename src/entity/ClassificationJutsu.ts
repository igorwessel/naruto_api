import { BaseManyToMany } from '../shared/BaseManyToMany';
import { ObjectType } from 'type-graphql';

@ObjectType()
export class ClassificationJutsu extends BaseManyToMany {}
