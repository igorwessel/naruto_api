# NarutoAPI

Criei essa API para exercitar o meu conhecimento referente ao backend e tambem para aprendizado do GraphQL junto com Typescript. A ideia de criar essa API surgiu do meu irmão mais novo que é fascinado no Naruto já assistiu o clássico/shippuden e atualmente está lendo o manga. Achei que seria interessante criar uma API pública para que todo mundo possa desfrutar/usar para seus projetos pessoais e afins.

# Todo List

- [] Criar Versão PT-BR
- [] Adicionar para o ninja, jutsu, tool, team, qual foi a primeira aparição.
- [] Implementar testes para os resolvers.
- [] Ter uma versão RESTFUL em outro ENDPOINT.
- [] Implementar query para jutsus
- [] Implementar query para tools
- [] Implementar query para team
- [] Implementar query com filtros para o ninja

## Examples

A query ninja (no singular), é como ela mesma já diz ela vai buscar somente 1 Ninja e ela retorna o **Type Ninja** abaixo que tu pode escolher que atributo pegar, caso queira saber mais sobre os outros tipos, acesse a pasta **docs**.

```graphql
type Ninja {
	academy_grad_age: String
	affiliation: [Affiliation!]
	birthdate: String
	blood_type: String
	chunin_prom_age: String
	clan: [Clan!]
	classification: [Classification!]
	family: [Family!]
	id: Float!
	jutsus: [Jutsu!]
	name: String
	nature_type: [NatureType!]
	ninja_attributes: [NinjaAttr!]
	ninja_registration: String
	occupation: [Occupation!]
	sex: String
	status: String
	team: [Team!]
	tools: [Tools!]
	unique_traits: String
}
```

```graphql
{
	ninja {
		id
		name
	}
}
```

Retorno esperado:

```
    data: {
        ninja: {
            id: 1
            name: "Naruto Uzumaki"
        }
    }
```
