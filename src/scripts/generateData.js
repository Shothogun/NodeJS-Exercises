/////////////////////////////////////
//      # Codigo Teste 2           //
//                                 //
// Autor: Otho Teixeira Komatsu    //
/////////////////////////////////////

const fs = require('fs');
const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const unifySubarray = (supArray, subArray) => supArray.concat(subArray);


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


    let board31Data = data['pages'].slice(0, 5)
      .map(
        (page) => page['content']
          .map((element) => element['str'])
          .filter((element) => element != ' '));

    board31Data[0] = board31Data[0].slice(63);
    board31Data[1] = board31Data[1].slice(7);
    board31Data[2] = board31Data[2].slice(7);
    board31Data[3] = board31Data[3].slice(7);
    board31Data[4] = board31Data[4].slice(7);

    board31Data = board31Data.reduce(unifySubarray);

    let board32Data = data['pages'][6]['content']
      .map((element) => element['str'])
      .filter((element) => element != ' ')
      .slice(-9);

    console.log(board30Data);
  });

  
}

module.exports = generateData;