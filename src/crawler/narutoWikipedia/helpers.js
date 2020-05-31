async function getPersonalInfo(page) {
  const fields = [
    'Birthdate',
    'Sex',
    'Age',
    'Species',
    'Status',
    'Height',
    'Weight',
    'Partner',
    'Blood type',
    'Kekkei Genkai',
    'Kekkei Mōra',
    'Jinchūriki',
    'Classification',
    'Tailed Beast',
    'Occupation',
    'Affiliation',
    'Team',
    'Clan',
    'Ninja Rank',
    'Ninja Registration',
    'Academy Grad. Age',
    'Chūnin Prom. Age',
  ];

  const elementsText = [];

  for (let field of fields) {
    const element = await page.$x(
      `//th[contains(text(),"${field}")]//parent::tr`
    );
    const elementText = await page.evaluate(
      (e) =>
        e
          ? e.innerText
              .trim()
              .split('\t')
              .map((t, i) => {
                t = t.trim();
                t = t.replace('ū', 'u');
                t = t.replace(/(ō|Ō)/gm, 'o');
                t = t.replace('.', '');

                if (i === 0) {
                  t = t.toLowerCase().replace(/\s/gm, '_');
                }

                if (t.includes('\n')) {
                  t = t.split('\n');
                }

                if (t.includes(',')) {
                  t = t.split(',').map((t) => t.trim());
                }

                return t;
              })
          : [null],
      ...element
    );

    elementsText.push(elementText);
  }

  const info = elementsText
    .filter((t) => t[0] !== null)
    .reduce((obj, item) => {
      const key = item[0];
      let value = item[1];

      if (value instanceof Array) {
        value = value.map((t) => t.trim());
      }

      if (value instanceof Array && value[0].match(/^Part/gm)) {
        value = value
          .map((t) => t.split(':').map((t) => t.trim()))
          .reduce((obj, item) => {
            const key = item[0].toLowerCase().replace(/\s/gm, '_');
            let value = item[1].trim();

            if (value.match(/(\d{4}\scm)/gm)) {
              value = `${value.substr(0, 3)}.${value.substr(3)}`;
            }

            if (value.match(/(\d{3})\skg/gm)) {
              value = `${value.substr(0, 2)}.${value.substr(2)}`;
            }

            return {
              ...obj,
              [key]: value,
            };
          }, {});
      }

      return {
        ...obj,
        [key]: value,
      };
    }, {});

  const name = await page.evaluate(
    () => document.querySelector('.page-header__title').innerText
  );

  return {
    name,
    ...info,
  };
}

async function getAppearsIn(page) {
  const xpathManga = "//th[contains(text(),'Manga')]//parent::tr";
  const xpathAnime = "//th[contains(text(),'Anime')]//parent::tr";
  const xpathGame = "//th[contains(text(),'Game')]//parent::tr";
  const xpathNovel = "//th[contains(text(),'Novel')]//parent::tr";
  const xpathOVA = "//th[contains(text(),'OVA')]//parent::tr";
  const xpathMovie = "//th[contains(text(),'Movie')]//parent::tr";

  const mangaElement = await page.$x(xpathManga);
  const animeElement = await page.$x(xpathAnime);
  const gameElement = await page.$x(xpathGame);
  const novelElement = await page.$x(xpathNovel);
  const ovaElement = await page.$x(xpathOVA);
  const movieElement = await page.$x(xpathMovie);

  const mangaText = await page.evaluate(
    (e) =>
      e
        ? e.textContent
            .trim()
            .split('\n')
            .filter((t) => t !== '')
            .map((t, i) => {
              t = t.trim();
              if (i === 0) {
                t = t.toLowerCase();
              }

              return t;
            })
        : [null],
    ...mangaElement
  );

  const animeText = await page.evaluate(
    (e) =>
      e
        ? e.textContent
            .trim()
            .split('\n')
            .filter((t) => t !== '')
            .map((t, i) => {
              t = t.trim();
              if (i === 0) {
                t = t.toLowerCase();
              }

              return t;
            })
        : [null],
    ...animeElement
  );

  const gameText = await page.evaluate(
    (e) =>
      e
        ? e.textContent
            .trim()
            .split('\n')
            .filter((t) => t !== '')
            .map((t, i) => {
              t = t.trim();
              if (i === 0) {
                t = t.toLowerCase();
              }

              return t;
            })
        : [null],
    ...gameElement
  );

  const novelText = await page.evaluate(
    (e) =>
      e
        ? e.textContent
            .trim()
            .split('\n')
            .filter((t) => t !== '')
            .map((t, i) => {
              t = t.trim();
              if (i === 0) {
                t = t.toLowerCase();
              }

              return t;
            })
        : [null],
    ...novelElement
  );

  const ovaText = await page.evaluate(
    (e) =>
      e
        ? e.textContent
            .trim()
            .split('\n')
            .filter((t) => t !== '')
            .map((t, i) => {
              t = t.trim();
              if (i === 0) {
                t = t.toLowerCase();
              }

              return t;
            })
        : [null],
    ...ovaElement
  );

  const movieText = await page.evaluate(
    (e) =>
      e
        ? e.textContent
            .trim()
            .split('\n')
            .filter((t) => t !== '')
            .map((t, i) => {
              t = t.trim();
              if (i === 0) {
                t = t.toLowerCase();
              }

              return t;
            })
        : [null],
    ...movieElement
  );

  const manga = mangaText.filter((t) => t !== null);
  const anime = animeText.filter((t) => t !== null);
  const game = gameText.filter((t) => t !== null);
  const novel = novelText.filter((t) => t !== null);
  const ova = ovaText.filter((t) => t !== null);
  const movie = movieText.filter((t) => t !== null);

  const appears_in = [manga, anime, game, novel, ova, movie]
    .filter((t) => t.length !== 0)
    .reduce((obj, item) => ({ ...obj, [item[0]]: item.slice(1) }), {});

  return { appears_in };
}

async function getFamilyInfo(page) {
  const familyElement = await page.$x(
    '//*[contains(text(), "Family")]//parent::tr//parent::tbody//parent::table//parent::td'
  );

  const familyText = await page.evaluate(
    (e) =>
      e
        ? e.textContent
            .trim()
            .replace('\t', '')
            .split('\n')
            .filter((t) => t !== '')
        : [null],
    ...familyElement
  );

  const family = familyText.some((t) => t === null)
    ? familyText.filter((t) => t !== null)
    : familyText.filter((t) => !t.includes('Family'));

  return { family };
}

async function getNatureType(page) {
  const natureTypeElement = await page.$x(
    "//th[contains(text(),'Nature Type')]//parent::tr//parent::tbody"
  );

  const natureTypeText = await page.evaluate(
    (e) =>
      e
        ? e.innerText
            .trim()
            .split('\n')
            .map((t) => t.trim())
            .filter((t) => t !== '')
            .slice(2)
        : [null],
    ...natureTypeElement
  );
  const nature_type = natureTypeText.filter((t) => t !== null);

  return { nature_type };
}

async function getUniqueTraits(page) {
  const xpath =
    "//th[contains(text(),'Unique Traits')]//parent::tr//parent::tbody";

  const uniqueElement = await page.$x(xpath);

  const uniqueText = await page.evaluate(
    (e) =>
      e
        ? e.innerText
            .trim()
            .split('\n')
            .filter((t) => t !== '')
            .splice(2)
        : [null],
    ...uniqueElement
  );

  return { unique_traits: uniqueText.join('\n') };
}

async function getJutsus(page) {
  const jutsuElement = await page.$x(
    '//a[@class="text" and contains(text(), "Jutsu")]//parent::th//parent::tr//parent::tbody'
  );

  const jutsuText = await page.evaluate(
    (e) =>
      e
        ? e.textContent
            .trim()
            .split('\n')
            .filter((t) => t !== '')
            .map((t) => t.trim())
            .slice(1)
        : [null],
    ...jutsuElement
  );

  const jutsu = jutsuText.filter((t) => t !== null);

  return { jutsu };
}

async function getTools(page) {
  const toolsElement = await page.$x(
    '//a[@class="text" and contains(text(), "Tools")]//parent::th//parent::tr//parent::tbody'
  );

  const toolsText = await page.evaluate(
    (e) =>
      e
        ? e.textContent
            .trim()
            .split('\n')
            .filter((t) => t !== '')
            .map((t) => t.trim())
            .slice(1)
        : [null],
    ...toolsElement
  );

  const tools = toolsText.filter((t) => t !== null);

  return { tools };
}

module.exports = {
  getTools,
  getJutsus,
  getNatureType,
  getFamilyInfo,
  getPersonalInfo,
  getAppearsIn,
  getUniqueTraits,
};
