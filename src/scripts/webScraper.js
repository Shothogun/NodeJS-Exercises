/////////////////////////////////////
//      # Codigo Teste 1           //
//                                 //
// Autor: Otho Teixeira Komatsu    //
/////////////////////////////////////

const puppeteer = require('puppeteer')
const http = require('http');
const fs = require('fs');

const webScraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar');

  // Botão cujo link da acesso a pagina 
  // de acesso a versao mais recente do padrao
  const access_button = await page.$x("//a[contains(text(), ' Clique aqui para acessar a versão Dezembro/2020')]");

  // Se o botao é encontrado, clica
  if (access_button.length > 0) {
    await access_button[0].click();

    // Espera navegação ate a pagina onde
    // contem o arquivo do componente
    await page.waitForNavigation();
  }

  // Acesso ao href do botão do download do pdf
  const download_button = await page.$x("//a[contains(text(), ' Visualizar anexo')]/@href");

  if (download_button.length > 0) {
    const propertyHandle = await download_button[0].getProperty('value');

    // Path do documento dentro da url do site
    // "http://www.ans.gov.br"
    const filePath = await propertyHandle.jsonValue();

    // Nome do arquivo(ultima parte da path)
    const fileName = String(filePath).split("/").slice(-1)[0];

    // Criaçao do arquivo e requisicao
    // GET de download do pdf.
    const file = fs.createWriteStream(fileName);
    const request = http.get("http://www.ans.gov.br" + filePath, function (response) {
      response.pipe(file);
    });
  }
  await browser.close();

};

webScraper();

module.exports = webScraper;