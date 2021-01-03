# NodeJS-Exercises
![Hex.pm](https://img.shields.io/badge/node-%3E%3D%2010.18-blue?logo=Node.js&link=https://nodejs.org/en/)

## Versão do Node
  Para os códigos desenvolvidos, foi utilizado o node na versão `10.18.` 
  Recomenda-se o uso do nvm para uma execução apropriada do projeto nessa versão.

## Descrição

O codigo se trata de um script simples em `Node.js` que realiza quando executado:

1. Acesso ao site http://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar
 e a partir dela realizar o download da versão mais recente do documento em `PDF` do Padrão TISS.

## Execução Teste 1 - Web Scraping

Para a execução do projeto, entre na pasta raiz do projeto e execute:

```$ yarn install```

E depois:

```$ node src/scripts/webScraper.js```


Esse script gerará o arquivo `Padrao_TISS_Componente_Organizacional__202012.pdf` 
na pasta raiz do projeto.
## Execução Teste 2 - Transformação de dados

Antes de executar esse script, é necessário executar o programa do `Teste 1` para 
que ela baixe o pdf necessário para extrair os dados desse documento e transformá-la 
no formato `.csv`. Particulamente, trata-se dos `quadros 30`, `31` e `32` do documento.

Para a sua execução, na pasta raiz do projeto execute:

```$ node src/scripts/webScraper.js```

Esse script gerará os arquivos `Tabela de Categoria do Padrão TISS.csv`, 
`Tabela de Tipo de Solicitação.csv`, e `Tabela de Tipo do Demandante.csv`, provenientes 
dos quadros mencionados.

Por fim, esses arquivos são compactados no arquivo compactado 
`Teste_Intuitive_Care_Otho.zip`.
## TODO

- Adicionar Prettier
- Revisar e refatorar codigo
- Adaptar nome dos arquivos csv compatados para o padrao latino(ISO-8859-1)
- Modificar os `export.modules` para `export default` através do Babel