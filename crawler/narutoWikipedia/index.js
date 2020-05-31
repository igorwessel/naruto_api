const puppeteer = require('puppeteer');
const {
  getTools,
  getFamilyInfo,
  getJutsus,
  getNatureType,
  getPersonalInfo,
  getAppearsIn,
} = require('./helpers');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://naruto.fandom.com/wiki/Fud%C5%8D');

  // const personal_info = await getPersonalInfo(page);
  // const tools = await getTools(page);
  // const family = await getFamilyInfo(page);
  // const jutsus = await getJutsus(page);
  // const nature_type = await getNatureType(page);

  const appears_in = await getAppearsIn(page);

  console.log(appears_in);
})();
