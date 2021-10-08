import { BaseManyToMany } from '../shared/BaseManyToMany';
import { ObjectType } from 'type-graphql';

@ObjectType()
export class Affiliation extends BaseManyToMany {}
