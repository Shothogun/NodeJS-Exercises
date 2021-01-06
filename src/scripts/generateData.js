/////////////////////////////////////
//      # Codigo Teste 2           //
//                                 //
// Autor: Otho Teixeira Komatsu    //
/////////////////////////////////////

// **** Libs *****
const fs = require('fs');
const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const AdmZip = require('adm-zip');

const generateData = async () => {

  pdfFilePath = 'Padrao_TISS_Componente_Organizacional__202012.pdf';

  // Array dos boards a serem extraidos
  // do ".pdf" para o ".csv"
  let boards = [];

  // Abrir somente as paginas que 
  // contem os dados
  let options = {
    firstPage: 79,
    lastPage: 85,
  };

  // Parsing dos dados a serem extraidos
  let [csvFile1Name, csvFile2Name, csvFile3Name] = await new Promise(async (resolve, reject) => {
    pdfExtract.extract(pdfFilePath, options, (err, data) => {
      if (err) return console.log(err);

      // Array dos dados da tabela do quadro 30, em formato String
      // data['pages'][0]['content'] => Conteudo da Pagina 79(Array de Obj)
      // .slice(24,47)               => Parte da pagina que contem o quadro 30
      // .map()                      => Extrair os textos do pdf(Array de String)
      // .filter()                   => Retirar espaços em branco
      let board30Data = data['pages'][0]['content']
        .slice(22, 47)
        .map((element) => element['str'])
        .filter((element) => element != ' ');

      // Primeiro elemento eh o titulo
      let board30Title = board30Data[0];
      board30Data.shift();

      // Array dos dados da tabela do quadro 31, em formato String
      // Dados ocupam da pagina 79 a 84.
      // Procedimento analogo ao anterior, porem
      // o resultado é um array de subarrays
      let board31Data = data['pages'].slice(0, 6)
        .map(
          (page) => page['content']
            .map((element) => element['str']));

      // Para cada subarray(conteudo das paginas), seleciona-se
      // somente os dados referentes aos dados
      // do quadro 31.
      // Para 1º, pagina o quadro 
      // se encontra no final.
      board31Data[0] = board31Data[0].slice(114);

      // A partir da 2ª pagina, a tabela a pagina toda,
      // exceto os 6 primeiros caracteres "garbage" 
      // que aparecem em todas elas.
      board31Data[1] = board31Data[1].slice(15);
      board31Data[2] = board31Data[2].slice(15);
      board31Data[3] = board31Data[3].slice(15);
      board31Data[4] = board31Data[4].slice(15);
      board31Data[5] = board31Data[5].slice(15, -8);

      // Todos os dados do quadro 31 sao juntados
      // em um so array
      board31Data = board31Data.reduce(unifySubarray);

      let board31Title = board31Data[0];
      board31Data = board31Data.slice(2);
      // Array dos dados da tabela do quadro 32, em formato String
      // Codigo analoga as acima, porem os dados no 
      // codigo binario do pdf se encontrarm no final,
      // sendo os ultimos 9 caracteres.
      let board32Data = data['pages'][6]['content']
        .map((element) => element['str'])
        .filter((element) => element != ' ')
        .slice(-9);

      let board32Title = board32Data[0];
      board32Data.shift();

      // .csv quadro 30
      let board30Stream = '';

      for (var i = 0; i < board30Data.length; i += 2) {
        board30Stream += board30Data[i] + ';' + board30Data[i + 1] + '\n';
      }

      fs.writeFileSync(board30Title + '.csv', board30Stream, function (err) {
        if (err) return console.log(err);
      });


      // .csv quadro 31
      // A lib detectou algumas
      // frases compostas como frases de linhas distinas.
      // Para contornar isso, para cada string nao numerica
      // eh concatenada ao valor de uma coluna, formando assim
      // uma frase.
      // Se eh um numero, basta adicionar ela na coluna do codigo e 
      // separar com ;
      let board31Stream = '';
      // Primeiras 2 palavras sao as colunas
      // board31Data[1] eh ' '
      board31Stream = board31Data[0] + ';' + board31Data[2];
      for (var i = 3; i < board31Data.length; i++) {
        // Se o dado lido eh um numero
        // Cria uma linha, adiciona o codigo(numero),
        // insere separador ';'
        if (board31Data[i] >= '0' && board31Data[i] <= '9') {
          board31Stream += '\n' + board31Data[i] + ';'
          i++;
        }

        // Se nao eh numero, eh a descricao.
        // Concatena a frase ate acabar(encontrar proximo codigo)
        else {
          board31Stream += board31Data[i];
        }
      }

      fs.writeFileSync(board31Title + '.csv', board31Stream, function (err) {
        if (err) return console.log(err);
      });

      // .csv quadro 32
      let board32Stream = '';
      for (var i = 0; i < board32Data.length; i += 2) {
        board32Stream += board32Data[i] + ';' + board32Data[i + 1] + '\n';
      }

      fs.writeFileSync(board32Title + '.csv', board32Stream, function (err) {
        if (err) return console.log(err);
      });

      resolve([
        board30Title,
        board31Title,
        board32Title
      ])
    }); // pdfExtract.extract
  }); // Promise 

  var zip = new AdmZip();

  // Quadro 30 - Tabela de tipo do demandante
  zip.addLocalFile(csvFile1Name + '.csv');

  // Quadro 31 - Tabela de Categoria do Padrão TISS
  zip.addLocalFile(csvFile2Name + '.csv');

  // Quadro 32 - Tabela de Tipo de Solicitação
  zip.addLocalFile(csvFile3Name + '.csv');

  zip.writeZip("Teste_Intuitive_Care_Otho.zip");
} // generateData

const unifySubarray = (supArray, subArray) => supArray.concat(subArray);

generateData();

module.exports = generateData;