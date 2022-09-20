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
        /*args: ['--no-sandbox', '--disable-setuid-sandbox'] */ headless: true, devtools: true
    });

    // headless true vs false differences
    // https://github.com/puppeteer/puppeteer/issues/665
    // https://github.com/puppeteer/puppeteer/issues/3412#issuecomment-739807526
    // await page.setUserAgent(prefered user-agen);

    // https://www.browserstack.com/guide/how-to-start-with-puppeteer-debugging
    // headless debugging

    const page = (await browser.pages())[0];

    await page.goto(process.argv[2], { timeout: 0, waitUntil: 'networkidle2' });

    await page.waitForSelector('input[title=Search]');
    await page.evaluate(() => {
      const imagesLink = Array.from(document.querySelectorAll('a')).find(e => e.innerText == "Images")
      imagesLink.click();
    });

    await page.waitForNavigation({
      waitUntil: 'networkidle2',
    });

    await page.evaluate(() => {
      const cameraButton = document.querySelector('[aria-label="Search by image"]')
      cameraButton.click();
    });

    await page.waitForSelector('input[name=image_url]');
    await page.evaluate(() => {
      const inputField = document.querySelector('input[name=image_url]');
      inputField.click();
    });

    await page.type('input[name=image_url]', process.argv[3], { delay: 20 })

    await page.evaluate(() => {
      const submitButton = document.querySelector('input[type=submit]');
      submitButton.click();
    });

    // await page.waitForNavigation({
    //   waitUntil: 'networkidle0',
    // });


    windowHREF = await page.evaluate(() => {
      return { window_location: document.location.href }
    });


    /**
     * Browser needs to be headless in order to generate pdfs, ^^ set headless above to false
     */

    // await page.waitFor(250);
    // await page.pdf({
    //   path: process.argv[4],
    //   format: 'A4',
    //   margin: { top: 36, right: 36, bottom: 20, left: 36 },
    //   printBackground: true
    // });


    return windowHREF
  } catch (err) {
    console.log(err.message);
  } finally {
    if (browser) {
      fs.writeFileSync("./window_location.json", JSON.stringify(windowHREF));
      console.log("File is created!");

      browser.close();

      return "something"
    }
    process.exit();
  }
};

createPdf();

