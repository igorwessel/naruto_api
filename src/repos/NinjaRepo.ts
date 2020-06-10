import { Repository, EntityRepository, Like, SelectQueryBuilder } from 'typeorm';
import { Ninja } from '../entity/Ninja';

@EntityRepository(Ninja)
export class NinjaRepo extends Repository<Ninja> {
	findByName(name: string): Promise<Ninja[]> {
		console.log(name);
		return this.find({ name: name.includes('%') ? Like(name) : name });
	}

	async search(args: any): Promise<Ninja | undefined> {
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
		const ninja = await queryBuilder.getOne();

		return ninja;
	}
}
