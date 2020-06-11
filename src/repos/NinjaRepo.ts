import { Repository, EntityRepository, Like, SelectQueryBuilder } from 'typeorm';
import { Ninja } from '../entity/Ninja';

@EntityRepository(Ninja)
export class NinjaRepo extends Repository<Ninja> {
	/**
	 * This function have a responsability to create a queryBuilder to filter independent many filter option we have,
	 * automatically he identify if user put '%' like operator and modify this column/parameter to use like.
	 * Only search one ninja
	 * @param args : Receive one object with all properties of Filter
	 */
	async searchOne(args: any): Promise<Ninja | undefined> {
		const queryBuilder: SelectQueryBuilder<Ninja> = this.createQueryBuilder('ninja');

		args = Object.entries(args).filter(arg => arg[1] !== undefined);

		args.forEach((arg: [string, number | string], index: number): void => {
			const column = arg[0];
			const parameter = arg[1];
			const haveLikeOperator = typeof parameter === 'string' && parameter.includes('%');

			if (index === 0) {
				queryBuilder.where(`ninja.${column} ${haveLikeOperator ? 'like' : '='} :${column}`, {
					[column]: parameter
				});
			} else {
				queryBuilder.andWhere(`ninja.${column} ${haveLikeOperator ? 'like' : '='} :${column}`, {
					[column]: parameter
				});
			}
		});

		queryBuilder.leftJoinAndSelect('ninja.occupation', 'occupation');
		queryBuilder.leftJoinAndSelect('ninja.affiliation', 'affiliation');
		queryBuilder.leftJoinAndSelect('ninja.classification', 'classification');
		queryBuilder.leftJoinAndSelect('ninja.clan', 'clan');

		const ninja = await queryBuilder.getOne();

		return ninja;
	}

	/**
	 * This function have a responsability to create a queryBuilder to filter independent many filter option we have,
	 * automatically he identify if user put '%' like operator and modify this column/parameter to use like.
	 * Search Many Ninjas
	 * @param args : Receive one object with all properties of Filter
	 * @param skip : Receive a number indicating how many to skip
	 * @param take : Limit the search result
	 */
	async searchMany(args: any, skip: number, take: number): Promise<Ninja[]> {
		const queryBuilder: SelectQueryBuilder<Ninja> = this.createQueryBuilder('ninja');

		args = Object.entries(args).filter(arg => arg[1] !== undefined);

		args.forEach((arg: [string, number | string], index: number): void => {
			const column = arg[0];
			const parameter = arg[1];
			const haveLikeOperator = typeof parameter === 'string' && parameter.includes('%');

			if (index === 0) {
				queryBuilder.where(`ninja.${column} ${haveLikeOperator ? 'like' : '='} :${column}`, {
					[column]: parameter
				});
			} else {
				queryBuilder.andWhere(`ninja.${column} ${haveLikeOperator ? 'like' : '='} :${column}`, {
					[column]: parameter
				});
			}
		});

		queryBuilder.leftJoinAndSelect('ninja.occupation', 'occupation');
		queryBuilder.leftJoinAndSelect('ninja.affiliation', 'affiliation');
		queryBuilder.leftJoinAndSelect('ninja.classification', 'classification');
		queryBuilder.leftJoinAndSelect('ninja.clan', 'clan');
		queryBuilder.skip(skip);
		queryBuilder.take(take);

		const ninjas = await queryBuilder.getMany();

		return ninjas;
	}
}
