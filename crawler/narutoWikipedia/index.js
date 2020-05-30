const puppeteer = require('puppeteer');
const {
  getTools,
  getFamilyInfo,
  getJutsus,
  getNatureType,
  getPersonalInfo,
} = require('./helpers');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://naruto.fandom.com/wiki/A_(Third_Raikage)');

  const personal_info = await getPersonalInfo(page);

  console.log(personal_info);
})();
