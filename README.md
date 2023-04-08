Neste projeto apliquei os princípios de Programação Orientada a Objetos (POO) para a construção de uma API com CRUD para gerenciar uma concessionária de veículos. 

O banco de dados é MongoDB e utilizei o framework do Mongoose para modelagem.

## Orientações ##

Você pode rodar a aplicação localmente ou utilizando containers em docker para o node e o banco 
 
 ### Se optar pelo Docker ###
 
 **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior**
 > Rode os serviços `node` e `db` com o comando `docker-compose up -d`.

  - Esses serviços irão inicializar um container chamado `car_shop` e outro chamado `car_shop_db`;
  - A partir daqui você pode rodar o container `car_shop` via CLI com o comando:

> `docker exec -it car_shop bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

 > A partir do terminal do docker, instale as dependências com `npm install` <br>
 > Inicie a aplicação com o comando `npm run dev`
  
 - **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container

  ### Se optar por rodar a aplicação localmente  ###

  > Instale as dependências com `npm install` <br>
  > Inicie a aplicação com `npm run dev`

## Front end ##
A parte do front end ainda está em construção, mas já é possível visualizar a página que renderiza os carros disponíveis.

A aplicação está sendo desenvolvida utilizando React Hooks. Para iniciar a aplicação, vá para o diretório frontend/carshop e rode os comandos:
> `npm install` <br>
> `npm start`

