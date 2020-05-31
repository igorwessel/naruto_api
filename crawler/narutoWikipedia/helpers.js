async function getPersonalInfo(page) {
  const xpath = '//th[contains(text(),"Manga")]//parent::tr//parent::tbody';

  const tableElement = await page.$x(xpath);
  const info = await page.evaluate(
    (e) =>
      Array.from(document.querySelectorAll('tr'))
        .map((e) =>
          e.innerText.split('\n').map((t) => t.replace('\t', '').trim())
        )
        .filter((t) => t.length !== 0),
    ...tableElement
  );

  const name = await page.evaluate(
    () => document.querySelector('.page-header__title').innerText
  );

  const personal_info = info.reduce((obj, item) => {
    let key;
    let value = item[1];
    if (item.length === 2) {
      key = item[0].toLowerCase().replace(/\s/gm, '_');
    }

    if (value && value.match(/(\D+:\s)/gm)) {
      value = value.replace(/(\D+:\s)/gm, '');
    }

    if (key === 'height' || key === 'weight') {
      value = parseFloat(value.replace(/[A-z:\s]/gm, ''));
    }

    if (
      key === 'debut' ||
      key === 'manga' ||
      key === 'english' ||
      key === 'anime' ||
      key === 'game' ||
      key === 'appears_in' ||
      key === undefined ||
      key === 'japanese' ||
      key === '[collapse]' ||
      key === '[expand]' ||
      key === 'edit' ||
      key === 'エー_ē'
    ) {
      return obj;
    } else {
      return {
        ...obj,
        [key]: item.length >= 3 ? item : value,
      };
    }
  }, {});

  return {
    name,
    ...personal_info,
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
  const ova = ovaText.filter((t) => t !== null);
  const movie = movieText.filter((t) => t !== null);

  const appears_in = [manga, anime, game, ova, movie]
    .filter((t) => t.length !== 0)
    .reduce((obj, item) => ({ ...obj, [item[0]]: item.slice(1) }), {});

  return appears_in;
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

  const family = familyText.filter((t) => !t.includes('Family') || t !== null);

  return family;
}

async function getNatureType(page) {
  const natureTypeElement = await page.$x(
    "//th[contains(text(),'Nature Type')]//parent::tr//parent::tbody"
  );

  const natureTypeText = await page.evaluate(
    (e) => (e ? e.textContent.match(/(\w+\s?Release$)/gm) : [null]),
    ...natureTypeElement
  );

  const nature = natureTypeText.filter((t) => t !== null);

  return nature;
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

  return jutsu;
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

  return tools;
}

module.exports = {
  getTools,
  getJutsus,
  getNatureType,
  getFamilyInfo,
  getPersonalInfo,
  getAppearsIn,
};
