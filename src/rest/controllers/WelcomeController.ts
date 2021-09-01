import { JsonController, Get } from 'routing-controllers';

@JsonController()
export class WelcomeController {
	@Get('/')
	async showRoutes() {
		return {
			message: 'Bem vindo a NarutoAPI',
			routes: {
				ninjas: {
					getAll: '/ninjas',
					getOneNinjaById: '/ninjas/:id',
					getOneNinjaByName: '/ninjas/:name(kebab-case)',
					tools: '/ninjas/:id||:name/tools',
					attributes: '/ninjas/:id||:name/attributes',
					jutsus: '/ninjas/:id||:name/jutsus',
					family: '/ninjas/:id||:name/family',
					teams: '/ninjas/:id||:name/teams'
				},
				tools: {
					getAll: '/tools',
					getOneToolById: '/tools/:id',
					getOneToolByName: '/tools/:name(kebab-case)',
					ninjas: '/tools/:id||:name/ninjas'
				},
				teams: {
					getAll: '/teams',
					getOneTeamById: '/teams/:id',
					getOneTeamByName: '/teams/:name(kebab-case)',
					ninjas: '/teams/:id||:name/ninjas'
				},
				jutsus: {
					getAll: '/jutsus',
					getOneJutsuById: '/jutsus/:id',
					getOneJutsuByName: '/jutsus/:name(kebab-case)',
					ninjas: '/jutsus/:id||:name/ninjas'
				}
			}
		};
	}
}
