/////////////////////////////////////
//      # Codigo main              //
//                                 //
// Autor: Otho Teixeira Komatsu    //
/////////////////////////////////////

const puppeteer = require('puppeteer')
const http = require('http');
const fs = require('fs');
const webScraper = require('./scripts/webScraper');

const main = async () => {
  webScraper();
}

main();