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
					getOneNinjaByName: '/ninjas/:name(snake_case)',
					tools: '/ninjas/:id||:name/tools',
					attributes: '/ninjas/:id||:name/attributes',
					jutsus: '/ninjas/:id||:name/jutsus',
					family: '/ninjas/:id||:name/family',
					teams: '/ninjas/:id||:name/teams'
				},
				tools: {
					getAll: '/tools',
					getOneToolById: '/tools/:id',
					getOneToolByName: '/tools/:name(snake_case)'
				}
			}
		};
	}
}
