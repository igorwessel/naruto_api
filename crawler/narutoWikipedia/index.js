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
const fs = require('fs');
const {
  websites_A_H,
  websites_H_N,
  websites_N_U,
  websites_U_Z,
} = require('./websites');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (let site of websites_U_Z) {
    await page.goto(`https://naruto.fandom.com${site}`);

    const unique_traits = await getUniqueTraits(page);
    const personal_info = await getPersonalInfo(page);
    const tools = await getTools(page);
    const family = await getFamilyInfo(page);
    const jutsus = await getJutsus(page);
    const nature_type = await getNatureType(page, personal_info.name);
    const appears_in = await getAppearsIn(page);

    const ninja = [
      personal_info,
      tools,
      family,
      jutsus,
      nature_type,
      appears_in,
      unique_traits,
    ].reduce((obj, item) => ({ ...obj, ...item }), {});

    fs.writeFileSync(
      `${__dirname}/data/U-Z/${ninja.name
        .replace(/\s/gm, '_')
        .replace('-', '_')}.json`,
      JSON.stringify(ninja, null, 2)
    );

    console.log(`O ninja ${ninja.name} foi salvo!.`);
  }
})();
