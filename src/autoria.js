import request from "request";
import cheerio from "cheerio";
import fs from "fs";
const $ = 'https://auto.ria.com/car/jawa-yava/'
const load = cheerio.load($)
const pageNumber = load('a.page-link').eq(-2).text();
console.log(pageNumber);
const writeStream = fs.createWriteStream('./post/autoria.csv');

for(let i = 0; i <= pageNumber.length; i++ ){
request('https://auto.ria.com/car/jawa-yava/?page=${i}', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
   $('.content').each((i, el) => {
       const item = $(el)
       .find('.head-ticket')
       .text()
       .replace(/\s\s+/g, '');
       const price = $(el)
       .find('.price-ticket')
       .text()
       .replace(/\s\s+/g, '');
       const definition = $(el)
       .find('.definition-data')
       .text()
       .replace(/\s\s+/g, '');
       writeStream.write(`${item},${price},${definition} \n`);
   });
  }
});
}
