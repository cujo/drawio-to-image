#!/usr/bin/env node

const fs = require('fs');
const puppeteer = require('puppeteer');

let args = process.argv.slice(2)
const input = args[0];
const output = args[1];

const xml = fs.readFileSync(input, 'utf8');
const data = {
    nav: false,
    resize: false,
    xml: xml
};
let html = fs.readFileSync(__dirname + '/page.html', 'utf8');
html = html.replace('{DATA}', JSON.stringify(data).replace(/"/g, '&quot;'));

(async () => {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.setContent(html);
    await page.screenshot({ path: output, fullPage: true });
    await browser.close()
})();