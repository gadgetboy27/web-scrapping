const puppeteer = require ('puppeteer')

async function scrapeProduct(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [el] = await page.$x('//*[@id="imgBlkFront"]')
    const src = await el.getProperty('src')
    const imgURL = await src.jsonValue()

    const [el2] = await page.$x('//*[@id="productTitle"]')
    const txt = await el2.getProperty('textContent')
    const title = await txt.jsonValue()

    const [el3] = await page.$x('//*[@id="buyNewSection"]/h5/div/div[2]/div/span[2]')
    const txt2 = await el3.getProperty('textContent')
    const price = await txt2.jsonValue()

    console.log({imgURL, title, price})
    browser.close()
}

scrapeProduct('https://www.amazon.com/gp/product/1070682438?pf_rd_p=2d1ab404-3b11-4c97-b3db-48081e145e35&pf_rd_r=EH1011JCM638QJPX3EWH')

        const express = require('express');
        const request = require('request');
        const cheerio = require('cheerio');

        const app = express();

        app.get('/scrape', function(req, res){
            request('https://www.trademe.co.nz/a/property/residential/sale', function(error, response, html){
                if(!error){
                    const $ = cheerio.load(html);
                    const title = $('title').text();
                    res.send(title);
                }
            });
        });

        app.listen('8080');
        console.log('Listening on port 8080');