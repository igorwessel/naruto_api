import { Resolver, Query, FieldResolver, Root } from 'type-graphql';
import { Ninja } from '../../entity/Ninja';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { NinjaAttrRepo } from '../../repos/NinjaAttrRepo';
import { NinjaAttr } from '../../entity/NinjaAttr';
import { NinjaRepo } from '../../repos/NinjaRepo';

@Resolver(Ninja)
export class NinjaResolver {
	@InjectRepository(NinjaRepo)
	private readonly ninjaRepo: NinjaRepo;

	@InjectRepository(NinjaAttrRepo)
	private readonly ninjaAttrRepo: NinjaAttrRepo;

	@Query(() => [Ninja])
	async ninjas(): Promise<Ninja[]> {
		return await this.ninjaRepo.find();
	}

	@FieldResolver(() => NinjaAttr)
	async ninja_attributes(@Root() ninja_parent: Ninja): Promise<NinjaAttr[]> {
		const ninjaAttr = await this.ninjaAttrRepo.find({
			where: { ninja: ninja_parent.id },
			relations: ['season']
		});

		return ninjaAttr;
	}
}
