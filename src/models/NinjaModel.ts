import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import * as Sequelize from 'sequelize';

enum Sex {
	Male = 'Male',
	Female = 'Female',
	Various = 'Various'
}

export interface NinjaAttributes {
	id: Number;
	name: String;
	birthdate?: String;
	sex?: Sex;
	blood_type?: String;
	ninja_regisration?: String;
	academy_grad_age?: String;
	chunin_prom_age?: String;
	unique_traits?: String;
	id_clan?: Number;
}

export interface NinjaInstance extends Sequelize.Instance<NinjaAttributes>, NinjaAttributes {}

export interface NinjaModel extends BaseModelInterface, Sequelize.Model<NinjaInstance, NinjaAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): NinjaModel => {
	const Ninja: NinjaModel = sequelize.define(
		'Ninja',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING(128),
				allowNull: false
			},
			birthdate: {
				type: DataTypes.STRING(128),
				allowNull: true
			},
			sex: {
				type: DataTypes.ENUM(['Male', 'Female', 'Various']),
				allowNull: true
			},
			blood_type: {
				type: DataTypes.STRING(10),
				allowNull: true
			},
			ninja_regisration: {
				type: DataTypes.STRING(50),
				allowNull: true
			},
			academy_grad_age: {
				type: DataTypes.STRING(20),
				allowNull: true
			},
			chunin_prom_age: {
				type: DataTypes.STRING(20),
				allowNull: true
			},
			unique_traits: {
				type: DataTypes.TEXT({ length: 'medium' }),
				allowNull: true
			}
		},
		{
			tableName: 'ninjas'
		}
	);

	Ninja.associate = (models: ModelsInterface): void => {};

	return Ninja;
};
