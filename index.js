const puppeteer = require('puppeteer');
const fs = require('fs');

// const character = {
//   name,
// }

// (async () => {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   await page.goto('http://www.leafninja.com/biographies-A.php');

//   const links = await page.evaluate(() =>
//     [...document.querySelectorAll('a[href^="fullbio"]')].map((e) =>
//       e.getAttribute('href')
//     )
//   );
//   console.log(links);
//   example.unshift(firstCharacter);
//   console.log(example);
// })();

async function getNames(page) {
  const first = await page.$eval(
    'body > table:nth-child(2) > tbody > tr > td:nth-child(3) > table:nth-child(2) > tbody > tr:nth-child(2)',
    (e) => e.textContent.trim()
  );
  const names = await page.evaluate(() =>
    [
      ...document.querySelectorAll(
        'body > table:nth-child(2) > tbody > tr > td:nth-child(3) > table:nth-child(2) > tbody > tr:nth-child(1n + 3) > td > font > b > a'
      ),
    ].map((e) => e.textContent.trim())
  );
  names.unshift(first);
  names.forEach((v, i) => {
    if (v.includes('Click')) {
      names[i] = v.replace(/\[\D{36}/gm, '').trim();
    }
  });

  return names;
}

async function getInfo(page) {
  const pageResults = await page.evaluate(() =>
    [
      ...document.querySelectorAll(
        'body > table:nth-child(2) > tbody > tr > td:nth-child(3) > table:nth-child(2) > tbody > tr:nth-child(3n)'
      ),
    ].map((e) =>
      e.textContent
        .trim()
        .split('\n')
        .map((t) => t.trim())
        .filter((t) => t !== '')
    )
  );
  const personal_data_keys = pageResults
    .map((s) => s.map((t) => t.match(/^(\w*:|\w*\s\w*:)/gm)))
    .map((s) => s.filter((t) => t !== null))
    .map((s) => {
      s.map((t) => {
        t[0] = t[0].toLowerCase();
        t[0] = t[0].replace(' ', '_');
        t[0] = t[0].replace(':', '');
        return t[0];
      });
      return s;
    })
    .map((s) => s.flat());
  const personal_anime = pageResults
    .map((s) => s.map((t) => t.match(/\w*\s(Manga|Anime)\s\w*/gm)))
    .map((s) => s.filter((t) => t !== null))
    .map((s) => {
      s.map((t) => {
        t[0] = t[0].toLowerCase();
        t[0] = t[0].replace(/\s+/gm, '_');
        return t[0];
      });
      return s;
    })
    .map((s) => s.flat());

  personal_data_keys.forEach((t) => {
    t.splice(5, 0, ...personal_anime.splice(0, 1).flat());
  });

  const personal_data_values = pageResults
    .map((s) => s.map((t) => t.match(/:.*/gm)))
    .map((s) => s.filter((t) => t !== null))
    .map((s) => {
      return s.map((t) => {
        t[0] = t[0].replace(':', '');
        t[0] = t[0].trim();
        return t[0];
      });
    });

  const personal_stats_keys = pageResults
    .map((s) =>
      s.map((t) =>
        t.match(/(Latent Potential|Luck|Elemental Affinity|Yin \| Yang)/gm)
      )
    )
    .map((s) => s.filter((t) => t !== null))
    .map((s) => {
      return s.map((t) => {
        t[0] = t[0].trim();
        t[0] = t[0].replace(/\s/gm, '_');
        t[0] = t[0].replace(/(_\|)/, '');
        t[0] = t[0].toLowerCase();
        return t[0];
      });
    });

  const personal_stats_values = await page.evaluate(() =>
    [
      ...document.querySelectorAll(
        'body > table:nth-child(2) > tbody > tr > td:nth-child(3) > table:nth-child(2) > tbody > tr:nth-child(3n) > td:nth-child(2) > table:nth-child(4) > tbody:nth-child(1) > tr'
      ),
    ].map((e) =>
      e.textContent
        .trim()
        .split('\n')
        .map((t) => t.trim())
        .filter((t) => t !== '')
    )
  );

  // const personal_stats = personal_stats_keys.reduce(
  //   (acc, current, i) =>
  //     ({ ...acc, [current]: personal_stats_values[i] }),
  //   []
  // );

  let personal_info = personal_data_keys.map((v, i) =>
    v.reduce(
      (acc, key, keyIndex) => ({
        ...acc,
        [key]: personal_data_values[i][keyIndex][0],
      }),
      {}
    )
  );

  const object = [];

  // object.push({
  //   personal_info,
  //   personal_stats,
  // });

  return object;
}

async function getPersonalInfo(page) {
  const elements = await page.$x(
    '//*[text()="First Manga Appearance:"]//parent::font'
  );
  const personal_info = await page.evaluate(
    (...elements) => elements.map((e) => e.textContent),
    ...elements
  );

  const description_elements = await page.$x(
    '//*[text()="Click For Quick-Spoilers:"]//parent::font'
  );

  return personal_info;
}

async function getInfoStats(page) {
  const elements = await page.$x(
    '//*[text()="Personal Stats"]//parent::font//parent::td//parent::tr//parent::tbody//child::tr'
  );
  const stats = await page.evaluate(
    (...elements) =>
      elements.map((e) =>
        e.textContent
          .trim()
          .split('\n')
          .map((t) => t.trim())
      ),
    ...elements
  );

  console.log(stats);
  return stats;
}

async function getLinksFullBiography(page) {
  const links = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="fullbio"]')].map((e) =>
      e.getAttribute('href')
    )
  );

  return links;
}

async function start() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://www.leafninja.com/biographies-A.php');

  //   const names = await getNames(page);
  const description = await getInfo(page);
  const stats = await getInfoStats(page);
}

start();
