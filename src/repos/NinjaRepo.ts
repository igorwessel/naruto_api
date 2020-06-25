import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';
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
		const joinColumns: string[] = ['occupation', 'affiliation', 'classification', 'clan'];

		args = Object.entries(args).filter(arg => arg[1] !== undefined);

		joinColumns.forEach(joinColumn => {
			queryBuilder.leftJoinAndSelect(`ninja.${joinColumn}`, joinColumn);
		});

		args.forEach((arg: [string, string | number], index: number): void => {
			const column = arg[0];
			const parameter = arg[1];

			const isJoinColumn = joinColumns.some(joinColumn => column === joinColumn);
			const haveLikeOperator = typeof parameter === 'string' && parameter.includes('%');

			if (index === 0) {
				queryBuilder.where(
					`${isJoinColumn ? column + '.name' : 'ninja.' + column} ${haveLikeOperator ? 'like' : '='} :${
						isJoinColumn ? column + '_name' : column
					}`,
					{
						[`${isJoinColumn ? column + '_name' : column}`]: parameter
					}
				);
			} else {
				queryBuilder.andWhere(
					`${isJoinColumn ? column + '.name' : 'ninja.' + column} ${haveLikeOperator ? 'like' : '='} :${
						isJoinColumn ? column + '_name' : column
					}`,
					{
						[`${isJoinColumn ? column + '_name' : column}`]: parameter
					}
				);
			}
		});

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
	async searchMany(args?: any, offset?: number, limit?: number): Promise<any> {
		const queryBuilder: SelectQueryBuilder<Ninja> = this.createQueryBuilder('ninja');
		const joinColumns: string[] = ['occupation', 'affiliation', 'classification', 'clan'];

		if (!args || Object.keys(args).length === 0) {
			return await this.find({
				relations: ['occupation', 'affiliation', 'classification', 'clan'],
				skip: offset,
				take: limit
			});
		}

		args = Object.entries(args).filter(arg => arg[1] !== undefined);

		joinColumns.forEach(joinColumn => {
			queryBuilder.leftJoinAndSelect(`ninja.${joinColumn}`, joinColumn);
		});

		args.forEach((arg: string[], index: number): void => {
			const column = arg[0];
			const parameter = isNaN(Number(arg[1])) ? arg[1] : parseInt(arg[1]);

			const isJoinColumn = joinColumns.some(joinColumn => column === joinColumn);
			const haveLikeOperator = typeof parameter === 'string' && parameter.includes('%');

			if (index === 0) {
				queryBuilder.where(
					`${isJoinColumn ? column + '.name' : 'ninja.' + column} ${haveLikeOperator ? 'like' : '='} :${
						isJoinColumn ? column + '_name' : column
					}`,
					{
						[`${isJoinColumn ? column + '_name' : column}`]: parameter
					}
				);
			} else {
				queryBuilder.andWhere(
					`${isJoinColumn ? column + '.name' : 'ninja.' + column} ${haveLikeOperator ? 'like' : '='} :${
						isJoinColumn ? column + '_name' : column
					}`,
					{
						[`${isJoinColumn ? column + '_name' : column}`]: parameter
					}
				);
			}
		});

		queryBuilder.skip(offset);
		queryBuilder.take(limit);
		const ninjas = await queryBuilder.getMany();

		return ninjas;
	}
}
