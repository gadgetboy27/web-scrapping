const puppeteer = require ('puppeteer')

async function scrapProduct(url) {
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

scrapProduct('https://www.amazon.com/gp/product/1070682438?pf_rd_p=2d1ab404-3b11-4c97-b3db-48081e145e35&pf_rd_r=EH1011JCM638QJPX3EWH')

// async function scrapProduct(url) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.goto(url)

//     const [el1] = await page.$x('//*[@id="dimg_12"]')
//     const src = await el1.getProperty('src')
//     const imgURL = await src.jsonValue()

//     // const [el2] = await page.$x('/html/body/div/h2')
//     // const txt = await el2.getProperty('textContent')
//     // const title = await txt.jsonValue()

//     // const [el] = await page.$x('/html/body/div/table[1]/tbody/tr[2]/td[2]')
//     // const txt2 = await el.getProperty('textContent')
//     // const gasPrice = await txt2.jsonValue()

//     console.log({imgURL})
//     browser.close()

// }

// scrapProduct('https://www.google.com/search?rlz=1C5CHFA_enNZ854NZ855&sxsrf=ACYBGNT14wcBpWw_mpsJTUBLCJXrGn_Pbw:1578880134498&q=gas+prices+near+me&npsic=0&rflfq=1&rlha=0&rllag=-36958300,174813674,3251&tbm=lcl&ved=2ahUKEwi65bzsuv_mAhUSbn0KHamzCicQtgN6BAgLEAQ&tbs=lrf:!1m4!1u3!2m2!3m1!1e1!2m1!1e3!3sIAE,lf:1,lf_ui:3&rldoc=1#rlfi=hd:;si:;mv:[[-36.8691844,174.9483631],[-37.0609384,174.60089209999998]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!2m1!1e3!3sIAE,lf:1,lf_ui:3')