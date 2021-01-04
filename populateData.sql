-- CREATE DATABASE ans_db ENCODING 'LATIN1' 
-- LC_COLLATE 'pt_BR.ISO-8859-1' LC_CTYPE 'pt_BR.ISO-8859-1' template template0;

-- CREATE TABLE IF NOT EXISTS DemonstracaoContabil (
--     idDemonstracaoContabil SERIAL,
--     dataDemonstracaoContabil DATE,
--     regANS VARCHAR(6),
--     cdContaContabil VARCHAR(12),
--     DESCRICAO VARCHAR(200),
--     vlSaldoFfinal VARCHAR(15),
--     PRIMARY KEY (idDemonstracaoContabil)
-- );

-- CREATE TABLE IF NOT EXISTS OperadorAtivo (
--     idOperadorAtivo SERIAL,
--     regANS VARCHAR(6),
--     CNPJ VARCHAR(14),
--     razaoSocial VARCHAR(200),
--     nomeFantasia VARCHAR(200),
--     modalidade VARCHAR(50),
--     logradouro VARCHAR(50),
--     numero VARCHAR(50),
--     complemento VARCHAR(50),
--     bairro VARCHAR(50),
--     cidade VARCHAR(40),
--     UF VARCHAR(30),
--     CEP  VARCHAR(8),
--     DDD  VARCHAR(5),
--     telefone VARCHAR(30),
--     fax  VARCHAR(30),
--     enderecoEletronico VARCHAR(60),
--     representante VARCHAR(80),
--     cargoRepresentante VARCHAR(50),
--     dataRegistroANS DATE
-- );

-- COPY DemonstracaoContabil(dataDemonstracaoContabil,
--     regANS,
--     cdContaContabil,
--     DESCRICAO,
--     vlSaldoFfinal)
-- FROM '/home/shothogun/Documents/Projects/NodeJS-Exercises/1T2019.csv'
-- DELIMITER ';'
-- CSV HEADER
-- encoding 'latin1';

-- COPY DemonstracaoContabil(dataDemonstracaoContabil,
--     regANS,
--     cdContaContabil,
--     DESCRICAO,
--     vlSaldoFfinal)
-- FROM '/home/shothogun/Documents/Projects/NodeJS-Exercises/2T2019.csv'
-- DELIMITER ';'
-- CSV HEADER
-- encoding 'latin1';

-- COPY DemonstracaoContabil(dataDemonstracaoContabil,
--     regANS,
--     cdContaContabil,
--     DESCRICAO,
--     vlSaldoFfinal)
-- FROM '/home/shothogun/Documents/Projects/NodeJS-Exercises/3T2019.csv'
-- DELIMITER ';'
-- CSV HEADER
-- encoding 'latin1';

-- COPY DemonstracaoContabil(dataDemonstracaoContabil,
--     regANS,
--     cdContaContabil,
--     DESCRICAO,
--     vlSaldoFfinal)
-- FROM '/home/shothogun/Documents/Projects/NodeJS-Exercises/4T2019.csv'
-- DELIMITER ';'
-- CSV HEADER
-- encoding 'latin1';

-- COPY DemonstracaoContabil(dataDemonstracaoContabil,
--     regANS,
--     cdContaContabil,
--     DESCRICAO,
--     vlSaldoFfinal)
-- FROM '/home/shothogun/Documents/Projects/NodeJS-Exercises/1T2020.csv'
-- DELIMITER ';'
-- CSV HEADER
-- encoding 'latin1';

-- COPY DemonstracaoContabil(dataDemonstracaoContabil,
--     regANS,
--     cdContaContabil,
--     DESCRICAO,
--     vlSaldoFfinal)
-- FROM '/home/shothogun/Documents/Projects/NodeJS-Exercises/2T2020.csv'
-- DELIMITER ';'
-- CSV HEADER
-- encoding 'latin1';

-- COPY DemonstracaoContabil(dataDemonstracaoContabil,
--     regANS,
--     cdContaContabil,
--     DESCRICAO,
--     vlSaldoFfinal)
-- FROM '/home/shothogun/Documents/Projects/NodeJS-Exercises/3T2020.csv'
-- DELIMITER ';'
-- CSV HEADER
-- encoding 'latin1';

-- COPY OperadorAtivo(regANS,
--     CNPJ,
--     razaoSocial,
--     nomeFantasia,
--     modalidade,
--     logradouro,
--     numero,
--     complemento,
--     bairro,
--     cidade,
--     UF,
--     CEP ,
--     DDD ,
--     telefone,
--     fax ,
--     enderecoEletronico,
--     representante,
--     cargoRepresentante,
--     dataRegistroANS)
-- FROM '/home/shothogun/Documents/Projects/NodeJS-Exercises/Relatorio_cadop.csv'
-- DELIMITER ';'
-- CSV HEADER
-- encoding 'latin1';

-- No ultimo trimestre
SELECT razaoSocial, vlSaldoFfinal, dataDemonstracaoContabil
FROM DemonstracaoContabil 
RIGHT JOIN OperadorAtivo
ON OperadorAtivo.regANS = DemonstracaoContabil.regANS 
WHERE DESCRICAO LIKE '%EVENTOS/ SINISTROS CONHECIDOS OU AVISADOS  DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR%'
AND dataDemonstracaoContabil >= '2020-07-01'
ORDER BY CAST(REPLACE(REPLACE(vlSaldoFfinal, '.', ''),',','.') AS DECIMAL(18,2))  DESC
LIMIT 10;

-- -- No ultimo ano
SELECT razaoSocial, vlSaldoFfinal, dataDemonstracaoContabil
FROM DemonstracaoContabil 
RIGHT JOIN OperadorAtivo
ON OperadorAtivo.regANS = DemonstracaoContabil.regANS 
WHERE DESCRICAO LIKE '%EVENTOS/ SINISTROS CONHECIDOS OU AVISADOS  DE ASSISTÊNCIA A SAÚDE MEDICO HOSPITALAR%'
AND dataDemonstracaoContabil >= '2020-01-01'
ORDER BY CAST(REPLACE(REPLACE(vlSaldoFfinal, '.', ''),',','.') AS DECIMAL(18,2))  DESC
LIMIT 10;