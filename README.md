# NodeJS-Exercises
![Hex.pm](https://img.shields.io/badge/node-%3E%3D%2010.18-blue?logo=Node.js&link=https://nodejs.org/en/) ![PG.pm](https://img.shields.io/badge/PG-10.15-blue?logo=PostgreSQL&link=https://nodejs.org/en/)
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
## Execução Teste 3 - Banco de dados

Para esse teste, foi utilizado para o load os arquivos provenientes dos links 
http://ftp.dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/(dados de 2019 e 2020) e 
 http://www.ans.gov.br/externo/site_novo/informacoes_avaliacoes_oper/lista_cadop.asp.

O script ".sql" criado foi escrito para os SGBDs `Postgres 10.15` no 
`Ubuntu 18.04 LTS`, realizando:

- Queries de load dos dados do arquivo .csv;
- Query analíticas que buscam:
    - As 10 operadoras que mais tiveram despesas com "EVENTOS/ SINISTROS CONHECIDOS OU AVISADOS  DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR" no último trimestre
    - As 10 operadoras que mais tiveram despesas com "EVENTOS/ SINISTROS CONHECIDOS OU AVISADOS  DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR" no último ano?

**========== IMPORTANTE ==========**

**============= Obs 1 =============**

Os valores da coluna `VL_SALDO_FINAL` em reais no arquivo `.csv` possuem suas 
casas decimais separadas por virgula, o que impede a conversão adequada do valor do dado para decimal(2). 
Uma vez que nesse contexto esse valor não será utilizado e a fim de facilitar a sua execução e verificação dos testes, foi optado por *não converte-los*, o que seria ideal para aplicação mais aprofundada. 

No caso da opção de conversão, seria necessário substituir as ',' por '.', pois o 
padrão numerico internacional utiliza o ponto como separador decimal.

Isso poderia ser solucionado criando-se um script `bash` ou `sh` que lesse os 
arquivos `csv` a serem utilizados e executando para cada um:

``` $ sed s/','/'.'/ arquivo.csv > arquivo_saida.csv ```

Assim no script `.sql` ao invés de `vlSaldoFfinal VARCHAR(15)`, isso seria substituído 
por `vlSaldoFfinal DECIMAL(2)`.

Para a comparação de seu valor nas *queries*, foi realizado a temporária 
substituição da ',' por '.' durante a consulta `querie` especificada acima, convertendo 
para um valor decimal de precisão de 2 digitos decimais.

**============= Obs 2 =============**

Para que o script lesse o arquivo `Relatorio_cadop.csv` foi necessario retirar a primeira 
linha titulo do arquivo `Relaçãoo de Operadoras Ativas ANS`.

## TODO

- Adaptar nome dos arquivos csv compatados para o padrao latino(ISO-8859-1)