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

  console.log(personal_info);

  return {
    name,
    ...personal_info,
  };
}

async function getFamilyInfo(page) {
  const familyElement = await page.$x(
    '//*[contains(text(), "Family")]//parent::tr//parent::tbody//parent::table//parent::td'
  );

  const familyText = await page.evaluate(
    (e) =>
      e.textContent
        .trim()
        .replace('\t', '')
        .split('\n')
        .filter((t) => t !== ''),
    ...familyElement
  );

  const family = familyText.filter((t) => !t.includes('Family'));

  return family;
}

async function getNatureType(page) {
  const natureTypeElement = await page.$x(
    "//th[contains(text(),'Nature Type')]//parent::tr//parent::tbody"
  );

  const natureTypeText = await page.evaluate(
    (e) => e.textContent.match(/(\w+\s?Release$)/gm),
    ...natureTypeElement
  );
  return natureTypeText;
}

async function getJutsus(page) {
  const jutsuElement = await page.$x(
    '//a[@class="text" and contains(text(), "Jutsu")]//parent::th//parent::tr//parent::tbody'
  );

  const jutsuText = await page.evaluate(
    (e) =>
      e.textContent
        .trim()
        .split('\n')
        .filter((t) => t !== '')
        .map((t) => t.trim())
        .slice(1),
    ...jutsuElement
  );

  return jutsuText;
}

async function getTools(page) {
  const toolsElement = await page.$x(
    '//a[@class="text" and contains(text(), "Tools")]//parent::th//parent::tr//parent::tbody'
  );

  const tools = await page.evaluate(
    (e) =>
      e.textContent
        .trim()
        .split('\n')
        .filter((t) => t !== '')
        .map((t) => t.trim())
        .slice(1),
    ...toolsElement
  );

  return tools;
}

module.exports = {
  getTools,
  getJutsus,
  getNatureType,
  getFamilyInfo,
  getPersonalInfo,
};
