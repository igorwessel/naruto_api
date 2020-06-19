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
		const joinColumns: string[] = ['occupation', 'affiliation', 'classification', 'clan'];
		const filterJoinColumn: any[] = [];

		args = Object.entries(args).filter(arg => arg[1] !== undefined);

		args.forEach((arg: [string, number | string], index: number): void => {
			const column = arg[0];
			const parameter = arg[1];
			const isJoinColumn = joinColumns.some(joinColumn => column === joinColumn);

			// If the column filter is JoinColumn without Subquery, push to array for create relation with where
			if (isJoinColumn) {
				filterJoinColumn.push(arg);
				return;
			}

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

		joinColumns.forEach((column: string): void => {
			const needConditionInRelation = filterJoinColumn.filter(
				(joinColumn: [string, number | string]) => column === joinColumn[0]
			)[0];
			const parameter = needConditionInRelation ? needConditionInRelation[1] : null;

			const haveLikeOperator = typeof parameter === 'string' && parameter.includes('%');

			if (needConditionInRelation) {
				queryBuilder.innerJoinAndSelect(
					`ninja.${column}`,
					column,
					`${column}.name ${haveLikeOperator ? 'like' : '='} :name`,
					{
						name: parameter
					}
				);
			} else {
				queryBuilder.leftJoinAndSelect(`ninja.${column}`, column);
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
	async searchMany(args: any, offset: number, limit: number): Promise<Ninja[]> {
		const queryBuilder: SelectQueryBuilder<Ninja> = this.createQueryBuilder('ninja');

		if (!args) {
			return await this.find({
				relations: ['occupation', 'affiliation', 'classification', 'clan'],
				skip: offset,
				take: limit
			});
		}

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
		queryBuilder.skip(offset);
		queryBuilder.take(limit);

		const ninjas = await queryBuilder.getMany();

		return ninjas;
	}
}
