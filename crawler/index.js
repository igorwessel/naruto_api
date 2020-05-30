const puppeteer = require('puppeteer');
const fs = require('fs');
const {
  getDescription,
  getInfoStats,
  getLinksFullBiography,
  getNames,
  getPersonalData,
  getPersonalInfo,
} = require('./helpers');
const { websites } = require('./sites');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (let website of websites) {
    await page.goto(`http://www.leafninja.com/${website}`);

    const names = await getNames(page);
    const personal_stats = await getInfoStats(page);
    const description = await getDescription(page);
    const personal_info = await getPersonalInfo(page);
    const { personal_data, advacement_data } = await getPersonalData(page);

    const ninja = await names.map((name, i) => ({
      personal_data: {
        name,
        ...personal_data[i],
      },
      personal_info: {
        ...personal_info[i],
        description: description[i],
      },
      personal_stats: personal_stats[i],
      ...advacement_data[i],
    }));

    fs.writeFile(
      `./data/${website.replace('.php', '')}.json`,
      JSON.stringify(ninja, null, 2),
      (e) => {
        console.log(`A ${website.replace('.php', '')} foi salva!`);
      }
    );
  }
})();
