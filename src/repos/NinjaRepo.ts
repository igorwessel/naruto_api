import { Repository, EntityRepository, Like, SelectQueryBuilder, getCustomRepository, Brackets } from 'typeorm';
import { Ninja, NinjaTools } from '../entity/Ninja';
import { NinjaToolsRepo } from './NinjaToolsRepo';
import { manyLoader } from '../loaders/ManyLoader';

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
			queryBuilder.innerJoinAndSelect(`ninja.${joinColumn}`, joinColumn);
		});

		args.forEach((arg: [string, string | number], index: number): void => {
			const column = arg[0];
			const parameter = arg[1];

			const isJoinColumn = joinColumns.some(joinColumn => column === joinColumn);
			const haveLikeOperator = typeof parameter === 'string' && parameter.includes('%');

			if (index === 0 && !isJoinColumn) {
				queryBuilder.where(`ninja.${column} ${haveLikeOperator ? 'like' : '='} :${column}`, {
					[column]: parameter
				});
			} else if (index === 0 && isJoinColumn) {
				queryBuilder.where(`${column}.name ${haveLikeOperator ? 'like' : '='} :${column}_name`, {
					[`${column}_name`]: parameter
				});
			} else if (isJoinColumn) {
				queryBuilder.andWhere(`${column}.name ${haveLikeOperator ? 'like' : '='} :${column}_name`, {
					[`${column}_name`]: parameter
				});
			} else {
				queryBuilder.andWhere(`ninja.${column} ${haveLikeOperator ? 'like' : '='} :${column}`, {
					[column]: parameter
				});
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
	async searchMany(args: any, offset: number, limit: number): Promise<any> {
		const queryBuilder: SelectQueryBuilder<Ninja> = this.createQueryBuilder('ninja');
		const joinColumns: string[] = ['occupation', 'affiliation', 'classification', 'clan'];

		if (!args) {
			return await this.find({
				relations: ['occupation', 'affiliation', 'classification', 'clan'],
				skip: offset,
				take: limit
			});
		}

		args = Object.entries(args).filter(arg => arg[1] !== undefined);

		joinColumns.forEach(joinColumn => {
			queryBuilder.innerJoinAndSelect(`ninja.${joinColumn}`, joinColumn);
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
				queryBuilder.where(
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
