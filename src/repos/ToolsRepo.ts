import { Repository, EntityRepository } from 'typeorm';
import { Tools } from '../entity/Tools';

@EntityRepository(Tools)
export class ToolsRepo extends Repository<Tools> {}
