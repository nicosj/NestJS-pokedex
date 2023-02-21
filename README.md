<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollos

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest Cli

```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el  archivo __.env.template__ y renombrarlo a __.env__

6. LLenar las variables del entorno definidas __.env__

7.Ejecutar el proyecto

```
yarn start:dev
```

8.Reconstruir la base de datos con seeds
````
http://localhost:3000/api/v2/seed
````
## Stack usado
* NestJS
* MongoDB

# Notas
Heroku redeploy sin cambios:
````
git commit --allow-empty -m "Trigger rebuild"
git push heroku <master|main>
````