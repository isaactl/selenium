const {Builder, By, Key, until, logging } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');

// logging.installConsoleHandler();
// logging.getLogger('webdriver.http').setLevel(logging.Level.ALL);

const width = 640;
const height = 480;

(async function example() {
  let driver = await new Builder()
    .forBrowser('firefox')
    .usingServer("http://localhost:4444/wd/hub/")
    .setFirefoxOptions(new firefox.Options().headless())
    .build();
  try {
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.get('https://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleContains('webdriver'), 5000);
    await driver.findElement(By.id("result-stats"));
    page = await (await driver.getPageSource()).toString();

    fs.writeFile('/home/node/app/google.html', page, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  } finally {
    await driver.quit();
  }
})();