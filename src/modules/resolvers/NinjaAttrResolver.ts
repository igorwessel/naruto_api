import { FieldResolver, Root, Resolver, Ctx } from 'type-graphql';
import { NinjaAttr } from '../../entity/NinjaAttr';

@Resolver(NinjaAttr)
export class NinjaAttrResolver {}
