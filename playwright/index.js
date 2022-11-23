const playwright = require('playwright');
const express = require('express')
const app = express()
const port = 3000

// const browser = (async function() {
//   return await playwright.chromium.launch({
//     headless: true // setting this to true will not run the UI
// })})();

let browser;
(async function init() {
  browser = await playwright.chromium.launch({
    headless: true // setting this to true will not run the UI
  })
  console.log(browser);
})();


app.get('/', async (req, res) => {
    console.log(browser);
    const page = await browser.newPage();
    await page.goto('https://www.scrapingbee.com/blog/playwright-web-scraping/');
    await page.waitForTimeout(5000); // wait for 5 seconds
    const content = await page.content();
    res.send(content);
})

app.get('/close', async (req, res) => {
  await browser.close();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
