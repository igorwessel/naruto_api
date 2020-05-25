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
  //   const test = await page.evaluate(() =>
  //     [
  //       ...document.querySelectorAll(
  //         'body > table:nth-child(2) > tbody > tr > td:nth-child(3) > table:nth-child(2) > tbody > tr:nth-child(3n)'
  //       ),
  //     ].map((e) =>
  //       e.textContent
  //         .trim()
  //         .split('\n')
  //         .map((t) => t.trim())
  //         .filter((t) => t !== '')
  //     )
  //   );

  const data = [
    'Personal Data',
    'Registration ID: 005480',
    'Birthday: September 7th',
    'Blood Type: A',
    'Height: 181.3 cm',
    'Weight: 68.9 kg',
    'First Manga Appearance: Chapter 137',
    'First Anime Appearance: Naruto Episode 79',
    'Name Meaning: Aburame="Oil Woman" | Shibi=A type of tile, also a location',
    'Hidden Village: Leaf Village',
    'Rank: Jounin',
    'Age: 39',
    'See also: Aburame Clan, Aburame Shino',
    'Personal Stats',
    'Latent Potential',
    'Unknown',
    'Luck',
    'Unknown',
    'Elemental Affinity',
    'Unknown',
    'Yin | Yang',
    'Unknown',
    'Databook 2 Stats|Data',
  ];
  const personal_attr = data
    .map((s) => s.match(/^(\w*:|\w*\s\w*:)/gm))
    .filter((s) => s !== null)
    .map((s) => {
      s[0] = s[0].toLowerCase();
      s[0] = s[0].replace(' ', '_');
      s[0] = s[0].replace(':', '');
      return s[0];
    });
  const personal_anime = data
    .map((s) => s.match(/\w*\s(Manga|Anime)\s\w*/gm))
    .filter((s) => s !== null)
    .map((s) => {
      s[0] = s[0].toLowerCase();
      s[0] = s[0].replace(/\s+/gm, '_');
      return s[0];
    });

  const personal_info = data
    .map((s) => s.match(/:.*/gm))
    .filter((s) => s !== null)
    .map((s) => {
      s[0] = s[0].replace(':', '');
      s[0] = s[0].trim();
      return s;
    });

  console.log(personal_info);
}

getInfo();

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

  console.log(description);
}

// start();
