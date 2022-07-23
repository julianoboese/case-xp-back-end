# Case XP - Back-End <!-- omit in toc -->

Projeto desenvolvido para o processo seletivo para Software Engineer I na XP Inc.

- Repo Back-End: https://github.com/julianoboese/case-xp-back-end
- Back-End em produção: https://case-xp-back-end.herokuapp.com/api
- Repo Front-End: https://github.com/julianoboese/case-xp-front-end
- Front-End em produção: https://case-xp-front-end.herokuapp.com

<hr />
<br />

- [💻 Projeto](#-projeto)
  - [Entregas](#entregas)
- [📈 Requisitos e Regras de Negócio](#-requisitos-e-regras-de-negócio)
  - [Implementações adicionais](#implementações-adicionais)
- [🚀 Tecnologias e Ferramentas](#-tecnologias-e-ferramentas)
- [⚡ Rodando o projeto localmente](#-rodando-o-projeto-localmente)
- [💬 Contatos](#-contatos)

<br />

## 💻 Projeto

### Entregas
1. **API RESTful** para uma aplicação de investimento em renda variável, com algumas funcionalidades de conta digital.
2. **MVP** com Front-End conectado à API 100% funcional.

<br />

## 📈 Requisitos e Regras de Negócio
Durante o desenvolvimento do projeto, **todos os requisitos** solicitados foram implementados, assim como **funcionalidades adicionais**.

Além disso, foram tomadas algumas decisões de alteração dos nomes e rotas dos endpoints, assim como dos atributos enviados e retornados em cada requisição, visando a garantir uma maior coerência na aplicação como um todo.

Uma premissa importante considerada foi que:
> Todas as funcionalidades devem ser acessadas somente em ambiente autenticado.

Portanto, os endpoints foram definidos como:

- (*Adicional*) `POST /login` para realizar o login na aplicação;
  - Sendo validado se a pessoa usuária já tem cadastro e se a senha inserida está correta;
- (*Adicional*) `POST /register` para realizar a abertura de uma conta;
  - Sendo validado se a pessoa usuária já não possui conta na corretora;
- (*Adicional*) `GET /user` para retornar os dados da pessoa usuária;
- `GET /account` para exibir o saldo da conta da pessoa usuária;
- `POST /account/deposit` para realizar o depósito de valores na conta;
  - Sendo validado que não é possível depositar valores menores ou iguais a zero;
- `POST /account/withdraw` para realizar retirada de valores da conta;
  - Sendo validado que não é possível retirar valores menores ou iguais a zero;
  - Sendo validado que não é possível retirar valores maiores que o saldo da conta.
- `GET /assets/all` para exibir todos os ativos disponíveis na corretora;
- `GET /assets` para exibir todos os ativos que a pessoa usuária possui;
  - (*Adicional*) Retornando o preço e variação diária reais dos ativos buscados em API externa;
- `GET /assets/{assetId}` para exibir os dados de um ativo específico;
  - (*Adicional*) Retornando o preço e variação diária reais do ativo buscados em API externa;
- `POST /order/buy` para executar a compra de um ativo;
  - Sendo validado que a quantidade não pode ser maior que o disponível na corretora;
  - (*Adicional*) Sendo validado que a pessoa usuária tem saldo em conta disponível para a compra;
  - (*Adicional*) Reduzindo o saldo em conta da pessoa usuária;
- `POST /order/sell` para executar a venda de um ativo;
  - Sendo validado que a quantidade não pode ser maior que o disponível na carteira;
  - (*Adicional*) Aumentando o saldo em conta da pessoa usuária;
- (*Adicional*) `GET /operations` para retornar o extrato com a movimentação da conta.

### Implementações adicionais

- Testes Unitários
  - Cobertura de 100% das camadas de service, controller e middlewares;
  - Cobertura de 85% de toda a aplicação.
- Testes de Integração
  - Cobertura de 95% de todas as rotas.
- Autenticação e autorização via JWT
- Documentação da API no Swagger
- CI/CD
  - Lint e testes automatizados rodando com Github Actions a cada *push*;
  - Pipeline com 3 ambientes, ocorrendo deploy automático em contêiner somente caso passe nas *actions*.

<br />

## 🚀 Tecnologias e Ferramentas
O projeto foi desenvolvido com as seguintes tecnologias e ferramentas:

- Plataforma: **Node.js**
- Framework HTTP: **Express**
- Linguagem: **TypeScript**
- ORM: **Prisma**
- Banco de Dados: **Postgres**
- Autenticação: **JWT**
- Framework de Testes: **Jest**
- Conteinerização: **Docker**
- CI: **Github Actions**
- CD: **Heroku**

<br />

## ⚡ Rodando o projeto localmente

O projeto pode ser executando localmente em um contêiner Docker. Para isso, basta:
> Rodar os contêineres com
```bash
docker-compose up -d
``` 
Isso colocará em execução um contêiner para um banco de dados Postgres e outro para a aplicação.
> Após isso, acesse o terminal da aplicação com
```bash
docker exec -it case-xp bash
``` 
> Dentro da aplicação, instale as dependências
```bash
npm install
``` 
> E conecte ao banco de dados, fornecendo um seed inicial
```bash
npm run db:reset
``` 
<hr />

Tudo pronto! Vamos rodar a aplicação:

> Para iniciar o servidor em seu localhost em modo de desenvolvimento
```bash
npm run dev
``` 
> Caso queira compilar o código e executar a aplicação em seu localhost em modo de produção
```bash
npm run build
npm start
``` 
<hr />

> Os testes podem ser realizados com os seguintes comandos
```bash
npm run test //todos os testes
npm run test:unit //somente testes unitários
npm run test:integration //somente testes de integração
``` 
Caso deseje verificar a cobertura, basta inserir `:coverage` ao final do comando.

<br />

<details>
  <summary><strong>Caso deseje executar o projeto direto em sua máquina</strong></summary><br />

  Nesse caso:
  - É necessário que sua máquina tenha o `node` instalado, preferencialmente na versão 16.
  - Configure em um arquivo `.env` as variáveis de ambiente indicadas no arquivo de exemplo.

  Com isso, é necessário apenas subir o banco de dados em um contêiner (ou configurar um banco local):
  > Rodar o contêiner do banco de dados
  ```bash
  docker-compose up -d postgres
  ``` 
  > Instale as dependências
  ```bash
  npm install
  ``` 
  > E conecte ao banco de dados, fornecendo um seed inicial
  ```bash
  npm run db:reset
  ``` 
  <hr />

Tudo pronto! Vamos rodar a aplicação:

> Para iniciar o servidor em seu localhost em modo de desenvolvimento
```bash
npm run dev
``` 
> Caso queira compilar o código e executar a aplicação em seu localhost em modo de produção
```bash
npm run build
npm start
``` 
<hr />

> Os testes podem ser realizados com os seguintes comandos
```bash
npm run test //todos os testes
npm run test:unit //somente testes unitários
npm run test:integration //somente testes unitários
``` 
Caso deseje verificar a cobertura, basta inserir `:coverage` ao final do comando.
</details>


<br />

## 💬 Contatos

<div align="center" style="display: inline_block">
  <a href="https://julianoboese.github.io" target="_blank"><img height="28rem" src="https://img.shields.io/badge/my_portfolio-3fc337?style=for-the-badge" target="_blank"></a> 
  <a href="https://www.linkedin.com/in/julianoboese" target="_blank"><img height="28rem" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a> 
  <a href = "mailto:juliano.boese@gmail.com"><img height="28rem" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
</div>