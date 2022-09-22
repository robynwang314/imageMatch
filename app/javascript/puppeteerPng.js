'use strict';
const fs = require("fs");

// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`
const puppeteer = require('puppeteer-extra')

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

// const puppeteer = require('puppeteer');

const createPdf = async () => {
  let browser;
  let windowHREF;

  try {
    /**
     * can toggle on off dev tools, browser needs to be headless for pdf generation
     */

    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true, devtools: true
    });

    // headless true vs false differences
    // https://github.com/puppeteer/puppeteer/issues/665
    // https://github.com/puppeteer/puppeteer/issues/3412#issuecomment-739807526
    // await page.setUserAgent(prefered user-agen);

    // https://www.browserstack.com/guide/how-to-start-with-puppeteer-debugging
    // headless debugging

    const page = (await browser.pages())[0];

    await page.goto(process.argv[2], { timeout: 0, waitUntil: 'networkidle2' });

    await page.waitForSelector("span[class=VfPpkd-vQzf8d]");

    // click upload image

    await page.evaluate(() => {
      const uploadSelector = Array.from(document.querySelectorAll('.google-material-icons')).find(e => e.innerText == "file_upload")
      uploadSelector.click();

      const computer = Array.from(document.querySelectorAll('span')).find(e => e.innerText == "Computer")

      computer.click()
    });

    await new Promise(function (resolve) { setTimeout(resolve, 1000) });

    // actually upload image
    // ############### NOTES ###################
    // file to be uploaded in await elementHandle.uploadFile('stored_screenshot.png'); should be the saved local png file. AKA stored_screenshot. The puppeteerPNG.pdf is the one that gets created at the end of this script.

    await page.waitForSelector('input[type=file]');

    const elementHandle = await page.$("input[type=file]");
    await elementHandle.uploadFile('stored_screenshot.png');

    await new Promise(function (resolve) { setTimeout(resolve, 10000) });

    windowHREF = await page.evaluate(() => {
      return { window_location: document.location.href }
    });

    /**
     * Browser needs to be headless in order to generate pdfs, ^^ set headless above to false
     */
    await page.pdf({
      path: process.argv[4],
      format: 'A4',
      margin: { top: 36, right: 36, bottom: 20, left: 36 },
      printBackground: true
    });


    return windowHREF
  } catch (err) {
    console.log(err.message);
    process.exit();
  } finally {
    if (browser) {
      // fs.writeFileSync("./window_location.json", JSON.stringify(windowHREF));
      console.log("File is created!");
      browser.close();
      // return "something"
    }
    process.exit();
  }
};

createPdf();


