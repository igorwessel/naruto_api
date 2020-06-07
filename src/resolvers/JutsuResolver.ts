import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Jutsu } from '../entity/Jutsu';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { JutsuRepo } from '../repos/JutsuRepo';
import { Ninja } from '../entity/Ninja';

@Resolver(Jutsu)
export class JutsuResolver {
	@InjectRepository(JutsuRepo)
	private readonly jutsuRepo: JutsuRepo;

	@FieldResolver()
	async classification(@Root() jutsu: Jutsu) {
		const classification = (
			await this.jutsuRepo.findOne({
				relations: ['classification'],
				where: { id: jutsu.id }
			})
		)?.classification;

		return classification;
	}
}
