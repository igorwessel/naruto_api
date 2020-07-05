import { Repository, EntityRepository } from 'typeorm';
import { ClassificationJutsu } from '../entity/ClassificationJutsu';

@EntityRepository(ClassificationJutsu)
export class ClassificationJutsuRepo extends Repository<ClassificationJutsu> {}
