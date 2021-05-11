import request from "request";
import cheerio from "cheerio";
import fs from "fs";
const $ = 'https://www.olx.ua/transport/moto/mototsikly/q-jawa-500/'
const writeStream = fs.createWriteStream('./post/olx.csv');


request('https://www.olx.ua/transport/moto/mototsikly/q-jawa-500/', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
   $('tbody').each((i, el) => {
       const item = $(el)
       .find('.title-cell')
       .text()
       .replace(/\s\s+/g, '');
       const price = $(el)
       .find('.price')
       .text()
       .replace(/\s\s+/g, '');
       const definition = $(el)
       .find('.space')
       .text()
       .replace(/\s\s+/g, '');
       writeStream.write(`${item},${price},${definition} \n`);
   });
  }
});
