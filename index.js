#!/usr/bin/env node

const fs = require('fs');
const puppeteer = require('puppeteer');

let args = process.argv.slice(2)
let filePath = args[0];
console.log(filePath);

const xml = fs.readFileSync(filePath, 'utf8');
const data = {
    nav: false,
    resize: false,
    xml: xml
};
let html = fs.readFileSync(__dirname + '/page.html', 'utf8');
html = html.replace('{DATA}', JSON.stringify(data).replace(/"/g, '&quot;'));

console.log(html);

(async () => {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.setContent(html);
    await page.screenshot({ path: filePath.replace('.drawio', '.png'), fullPage: true });
    await browser.close()
})();