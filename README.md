# NarutoAPI

Criei essa API para exercitar o meu conhecimento referente ao backend e tambem para aprendizado do GraphQL junto com Typescript. 
A ideia de criar essa API surgiu do meu irmão mais novo que é fascinado no Naruto já assistiu o clássico/shippuden e atualmente está lendo o manga. 
Achei que seria interessante criar uma API pública para que todo mundo possa desfrutar/usar para seus projetos pessoais e afins. 

[NarutoAPI](http://www.narutoapi.com.br/ninjas)

# Endpoints

- Rest 
  - Ninjas
    - /ninjas - Lista os ninjas
    - /ninjas/{id | name} - Lista unico ninja
    - /ninjas/{id | name}/family - Lista a familia do ninja
    - /ninjas/{id | name}/jutsus - Lista jutsus do ninja
    - /ninjas/{id | name}/tools - Lista as ferramentas do ninja
    - /ninjas/{id | name}/attributes - Lista os atributos do ninja
    - /ninjas/{id | name}/teams - Lista as equipes que o ninja frequentou
  - Tools
    - /tools - Lista as ferramentas
    - /tools/{id | name} - Lista unica ferramenta
    - /tools/{id | name}/ninjas - Lista os ninjas que utilizaram a ferramenta
  - Teams
    - /teams - Lista os times
    - /teams/{id | name} - Lista unico time
    - /teams/{id | name}/ninjas - Lista os ninjas que faz/fizeram parte do time
  - Jutsus
    - /jutsus - Lista os jutsus
    - /jutsus/{id | name} - Lista unico jutsu
    - /jutsus/{id | name}/ninjas - Lista os ninjas que usa esse jutsu
- GraphQL
  - /altair (GraphQL Client)
  - /graphql (para enviar as requisições)


# Como iniciar o projeto

## 1. Instale as depedências

```dosini
$ yarn install
# or yarn
```

## 3. Crie um arquivo .env ou renomeie .env.example e coloque os valores nas variaveis

```dosini
# Application is listening in this port
PORT=

# DB Settings for Prisma
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=

# Prisma Connection
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
```

## 4. Rode o comando para criar o banco de dados

```dosini
$ npx prisma migrate dev
```

## 4.1 Se não tiver sido realizado o seed automaticamente

```dosini
$ npx prisma db seed
```

## 5. Rode o servidor

```dosini
$ yarn dev
```

## Para buildar o projeto

```dosini
# Mude as variaveis de ambiente novamente, caso precise mudar o banco de dados

$ npx prisma migrate deploy
$ npx prisma db seed
$ yarn start
```

## Credits

Toda data utilizada para distribuir em formato de API foi pega em [NarutoFandom](https://naruto.fandom.com/pt-br).