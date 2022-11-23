const playwright = require("playwright");
const express = require("express");
var bodyparser = require("body-parser");
const app = express();
const port = 3000;

var jsonParser = bodyparser.json();

const amazon = "amazon";
const ebay = "ebay";
const defaultTimeout = 5000;

let browser;
(async function init() {
  browser = await playwright.chromium.launch({
    headless: true, // setting this to true will not run the UI
  });
  // console.log(browser);
})();

app.get("/", async (req, res) => {
  let url = "https://www.scrapingbee.com/blog/playwright-web-scraping/";
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForTimeout(defaultTimeout); // wait for 5 seconds
  const content = await page.content();
  res.send(content);
});

app.post("/fetch", jsonParser, async (req, res) => {
  console.log("got body: ", req.body);
  let url = req.body.url;
  if (url === undefined || url === "") {
    res.statusCode = 400;
    res.write("missing url");
    return;
  }

  const page = await browser.newPage();
  await page.goto(url);

  switch (platform(url)) {
    case amazon:
      console.log(amazon);
      await page.waitForSelector("span[id=productTitle]", {
        timeout: defaultTimeout,
      });
      await page.waitForSelector(
        "//html/body/div[1]/div[2]/div[9]/div[6]/div[4]/div[1]/div/h1/span",
        { timeout: defaultTimeout }
      );
      console.log(await page.innerText("span[id=productTitle]"));
      break;
    case ebay:
      console.log(ebay);
      await page.waitForSelector("data-testid=x-item-title", {
        timeout: defaultTimeout,
      });
      break;
    default:
      console.log("default");
      await page.waitForLoadState("domcontentloaded", {
        timeout: defaultTimeout,
      });
      break;
  }

  const content = await page.content();
  console.log("sending...");
  res.send(content);
});

app.get("/close", async (req, res) => {
  req.hostname;
  await browser.close();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function platform(path) {
  const { hostname } = new URL(path);
  console.log(hostname);
  if (hostname.includes(amazon)) {
    return amazon;
  } else if (hostname.includes(ebay)) {
    return ebay;
  }

  return "";
}

console.logCopy = console.log.bind(console);
console.log = function () {
  var currentDate = "[" + new Date().toUTCString() + "]";
  this.logCopy(currentDate, JSON.stringify(arguments));
};
