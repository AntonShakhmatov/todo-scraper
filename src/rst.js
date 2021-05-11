import request from "request";
import cheerio from "cheerio";
import iconv from 'iconv-lite';
import fs from "fs";
const $ = 'https://rst.ua/oldcars/moto/'
const load = cheerio.load($)
const pageNumber = load('div.results-pager>ul.pagination>li>a').eq(-2).text();
const writeStream = fs.createWriteStream('./post/rst.csv');

for(let i = 0; i <= pageNumber.length; i++ ){
request('https://rst.ua/oldcars/moto/?${i}.html', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    html = iconv.decode(html, 'win1251');
    const $ = cheerio.load(html);
   $('.rst-ocb-i').each((i, el) => {
       const item = $(el)
       .find('.rst-ocb-i-h')
       .text()
       .replace(/\s\s+/g, '');
       const price = $(el)
       .find('.rst-ocb-i-d')
       .text()
       .replace(/\s\s+/g, '');
       const definition = $(el)
       .find('.rst-ocb-i-d-d')
       .text()
       .replace(/\s\s+/g, '');
       writeStream.write(`${item},${price},${definition} \n`);
   });
  }
});
}
