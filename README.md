<h1 align="center"> ACME Inc. </h1>

<div align="center">
  <img src="https://img.shields.io/badge/Status-Em%20desenvolvimento-FF9505" alt="Status do Projeto" />
  <img src="https://img.shields.io/badge/Next.js-14-blue" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/React-18-blue" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue" alt="TypeScript 5.0" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3.0-blue" alt="Tailwind CSS 3.0" />
</div>

<p align="justify"> A Acme é uma empresa que atua vendendo produtos genéricos e preza bastante pela qualidade de suas soluções e por estar sempre um passo à frente do mercado em relação ao uso de tecnologia e design de suas aplicações.
</p>

<p align="justify">
Esse projeto é o protótipo de um site para a ACME Inc. que foi desenvolvido como tarefa proposta em uma seleção de vaga para um time de desenvolvimento front-end na ######.
</p>

## [Demo](https://acme-inc-ruby.vercel.app/)

## Conteúdo

- [ACME Inc.](#acme-inc)
- [Sobre a tarefa](#sobre-a-tarefa)
  - [Este aplicativo deverá conter:](#este-aplicativo-deverá-conter)
  - [Funcionalidades:](#funcionalidades)
  - [Produtos:](#produtos)
  - [Regras para resolução da tarefa](#regras-para-resolução-da-tarefa)
- [Sobre o projeto](#sobre-o-projeto)
  - [Tecnologias](#technologias)
  - [Como rodar local](#como-rodar-local)
- [Sobre o localStorage](#sobre-o-localstorage)
- [Considerações finais](#considerações-finais)

## Sobre a tarefa

<p align="justify">
Como futuro Desenvolvedor Front-end, sua tarefa será desenvolver um aplicativo web simples para mostrarmos os produtos da Acme Inc. aos seus usuários.
</p>

#### Este aplicativo deverá conter:

- Uma página de autenticação, possibilitando o cadastro e/ou o acesso do usuário.
  - Campos do formulário de cadastro: nome, email, telefone e senha;
  - Campos do formulário de login: email e senha;
- Uma página inicial, que deverá mostrar uma lista de produtos da Acme
  - Uma página do produto, que deverá ser acessada ao clicar em um desses
    produtos da tela inicia;

#### Funcionalidades:

- O usuário deve poder se cadastrar e acessar sua conta
  - Os dados das contas cadastradas devem ser persistidos via local storage.
  - Um botão de carrinho posicionado em algum local da tela (fica a seu critério) onde o usuário poderá acessar o estado atual do carrinho de qualquer lugar da aplicação.
  - O usuário deve poder ver a página inicial, mas só poderá adicionar itens como favoritos caso esteja logado.
- Possibilidade de selecionarmos produtos como “favoritos”, em ambas as páginas
- Possibilidade de, na página inicial, filtrar produtos pelo status “favorito” ou pelo nome do produto
- Possibilidade de adicionar e remover itens do carrinho (carrinho e favorito são duas coisas diferentes!)
- Possibilidade de realizar o “checkout” do seu carrinho, o que deverá gerar um JSON com a lista de produtos que estavam no carrinho no momento do checkout e também trazer quaisquer informações da sessão do usuário que considere relevante.
- O usuário pode adicionar itens no carrinho sem estar logado, mas ao realizar o checkout, o site deve solicitar a autenticação primeiro.

#### Produtos:

- Você deverá garantir que a imagem dos itens não se altera ao longo da navegação em sua ferramenta.
- Para o conteúdo de cada item, como nome, descrição e valor unitário, segue a regra:
  - Para nome do produto
    - Um conjunto de Verbo + Adjetivo gerado aleatoriamente (sem repetir) seguindo as listas de verbos e adjetivos presentes ao fim deste arquivo.
  - Para descrição do produto
    - Um texto randômico de sua escolha de 20 a 500 caracteres
  - Para valor, a seguinte pseudo-fórmula:
    - Variáveis
      - nameLength: O número de palavras da variável ‘nome’
      - descrLength: O número total de caracteres da variável ‘descrição’
    - Fórmula
      - valor = 10 + nameLength \* ((500 - descrLength) / (4 – nameLength)

#### Regras para resolução da tarefa

- Você pode utilizar as linguagens de programação, frameworks e ferramentas de sua escolha para resolver este desafio.
- Segue os dados para a resolução deste exercício. Trate estes dados como vindo de uma API externa para efeitos deste exercício.

Os dados estão disponíveis [nesse arquivo](https://github.com/renexe/acme-inc/blob/main/src/mock/products-convention.ts).

## Sobre o projeto

> Status do Projeto: Em desenvolvimento ⚠️

#### Deploy da Aplicação com [Vercel](https://acme-inc-ruby.vercel.app/).

## Technologias

Este project foi construido usando:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

Utiliza [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para otimizar automaticamente as fontes usadas na aplicação. Bem como [`next/image`](https://nextjs.org/docs/basic-features/image-optimization) para otimizar as imagens.

Ele faz uso do [localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage) do navegador para armazenar os dados do usuário, dos produtos e do carrinho. E não conta com nenhuma biblioteca de gerenciamento de estado.

É importante salientar que se trata de uma aplicação de caso de uso, e não de um produto finalizado. Por isso, não há testes automatizados, nem uma preocupação com a segurança dos dados, por exemplo.

Portanto não é recomendável usá-la em produção!

## Como rodar local

Primeiro, instale as dependências:

```bash
npm install
# ou
yarn
# ou
pnpm install
```

Depois rode o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

## Sobre o generateProducts

<p align="justify">
Sempre que uma página do site for aberta no navegador pela primeira vez, ou seja, com o localStorage limpo, o arquivo <code>generateProducts.ts</code> é executado.

Ele gera um array de objetos com os dados dos produtos, e salva no localStorage.

Uma vez criado, a lista de produtos gerados não vai ser alterada até que o localStorage seja limpo novamente.

Veja como fazer isso logo abaixo.
</p>

## Sobre o localStorage

<p align="justify">
Como foi um requisito do projeto, o localStorage é usado para armazenar e persistir dados de usuários, dos produtos e do carrinho.
</p>

#### Para limpar o localStorage faça o seguinte:

Abra o console do navegador e digite:

```js
localStorage.clear();
```

Então recarregue a página.

## Considerações finais

<p align="justify">
Desenvolver esse protótipo foi uma experiência enriquecedora, desde que
o tempo não estava a meu favor. Mas em linha de gerais, fiquei satisfeito com o resultado, o design ficou bem próximo do que eu tinha em mente, e a experiência de usuário é boa.
</p>
<p align="justify">
Sinto não ter podido implementar todas as funcionalidades que eu gostaria, mas acredito que o projeto atende aos requisitos propostos. Além do que sempre há espaço para melhorias, e pretendo continuar trabalhando nele.
</p>

     LimaStack 🚀
