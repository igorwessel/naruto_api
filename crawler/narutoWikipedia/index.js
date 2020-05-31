const puppeteer = require('puppeteer');
const {
  getTools,
  getFamilyInfo,
  getJutsus,
  getNatureType,
  getPersonalInfo,
  getAppearsIn,
  getUniqueTraits,
} = require('./helpers');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://naruto.fandom.com/wiki/Ten-Tails');

  const unique_traits = await getUniqueTraits(page);
  const personal_info = await getPersonalInfo(page);
  const tools = await getTools(page);
  const family = await getFamilyInfo(page);
  const jutsus = await getJutsus(page);
  const nature_type = await getNatureType(page);
  const appears_in = await getAppearsIn(page);

  console.log(personal_info);
  console.log(tools);
  console.log(family);
  console.log(jutsus);
  console.log(nature_type);
  console.log(appears_in);
  console.log(unique_traits);
})();
