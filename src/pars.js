import request from "request";
import cheerio from "cheerio";
import fs from "fs";
const $ = 'https://ab.ua/mototsikl/jawa/'
const load = cheerio.load($)
const pageNumber = load('div>ul>li>a').eq(-2).text();
const writeStream = fs.createWriteStream('./post/abua.csv');

for(let i = 0; i <= pageNumber.length; i++ ){
request('https://ab.ua/mototsikl/jawa/', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
   $('._1p5h9').each((i, el) => {
       const item = $(el)
       .find('._2JYBg')
       .text()
       .replace(/\s\s+/g, '');
       const price = $(el)
       .find('._2et66')
       .text()
       .replace(/\s\s+/g, '');
       const definition = $(el)
       .find('._233TV')
       .text()
       .replace(/\s\s+/g, '');
       writeStream.write(`${item},${price},${definition} \n`);
   });
  }
});
}