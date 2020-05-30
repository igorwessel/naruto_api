function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

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

async function getPersonalData(page) {
  const personal_data_elements = await page.$x('//td[@width="15%"]');

  const pageResults = await page.evaluate(
    (...personal_data_elements) =>
      personal_data_elements.map((e) =>
        e.textContent
          .trim()
          .split('\n')
          .map((t) => t.trim())
      ),
    ...personal_data_elements
  );

  const personal_data_obj = pageResults.map((e) =>
    e
      .map((t) => t.split(':'))
      .reduce((obj, item) => {
        let key;
        let value = item.length == 2 ? item[1].trim() : null;

        if (item[0]) {
          key = item[0].toLowerCase().replace(/\s+/gm, '_').replace('-', '_');
        }
        if (key === undefined) {
          return obj;
        }

        if (key.includes('databook')) {
          advancement_data = {
            academy_grad_age: 'unknown',
            chuunin_exam_age: 'unknown',
          };
          missions_completed = {
            d_rank: 'unknown',
            c_rank: 'unknown',
            b_rank: 'unknown',
            a_rank: 'unknown',
            s_rank: 'unknown',
          };

          return {
            ...obj,
            advancement_data,
            missions_completed,
          };
        }

        if (key === 'personal_data') {
          return obj;
        }

        return {
          ...obj,
          [key]: value,
        };
      }, {})
  );

  const personal_data = personal_data_obj
    .filter((v, i) => i % 2 === 0)
    .map((t) => {
      if (isEmpty(t)) {
        return {
          registration_id: 'unknown',
          birthday: 'unknown',
          blood_type: 'unknown',
          height: 'unknown',
          weight: 'unknown',
        };
      }

      return t;
    });

  const advacement_data = personal_data_obj
    .filter((v, i) => i % 2 !== 0)
    .map((t, i) => {
      if (isEmpty(t)) {
        return {
          advancement_data: {
            academy_grad_age: 'unknown',
            chuunin_exam_age: 'unknown',
          },
          missions_completed: {
            d_rank: 'unknown',
            c_rank: 'unknown',
            b_rank: 'unknown',
            a_rank: 'unknown',
            s_rank: 'unknown',
          },
        };
      }

      if (t.advancement_data === null) {
        const {
          academy_grad_age,
          chuunin_exam_age,
          d_rank,
          c_rank,
          b_rank,
          a_rank,
          s_rank,
        } = { ...t };

        return {
          advancement_data: {
            academy_grad_age,
            chuunin_exam_age,
          },
          missions_completed: {
            d_rank,
            c_rank,
            b_rank,
            a_rank,
            s_rank,
          },
        };
      }
      return t;
    });

  return { personal_data, advacement_data };
}

async function getPersonalInfo(page) {
  const elements = await page.$x(
    '//*[text()="First Manga Appearance:"]//parent::font'
  );
  const pageResults = await page.evaluate(
    (...elements) =>
      elements.map((e) =>
        e.textContent
          .trim()
          .split('\n')
          .map((t) => t.trim())
      ),
    ...elements
  );

  const personal_info = pageResults.reduce((arr, item) => {
    const info = item
      .map((t) => t.split(':'))
      .reduce((obj, info) => {
        const key = info[0].toLowerCase().replace(/\s+/gm, '_');
        let value = 'unknown';

        if (info[1]) {
          value = info[1].trim().replace(/\"*/gm, '');
        }

        if (info[0] === 'age') {
          value = parseInt(info[1]);
        }

        return { ...obj, [key]: value };
      }, {});

    return [...arr, info];
  }, []);

  return personal_info;
}

async function getDescription(page) {
  const description_elements = await page.$x(
    '//*[text()="Click For Quick-Spoilers:"]//parent::font'
  );

  const pageResults = await page.evaluate(
    (...description_elements) =>
      description_elements.map((e) =>
        e.textContent
          .trim()
          .split('\n')
          .map((t) => t.trim())
      ),
    ...description_elements
  );

  const description = pageResults.map((paragraph) => {
    return paragraph.filter((p) => p !== '')[0];
  });

  return description;
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

  const statsInfo = stats
    .map((_, index) => {
      if (index % 5 === 0) {
        return stats.slice(index + 1, index + 5);
      }
    })
    .filter((t) => t !== undefined)
    .map((current) =>
      current
        .map((t) =>
          t[0].toLowerCase().replace(/\s/gm, '_').replace(/(_\|)/, '')
        )
        .reduce((acc, current) => ({ ...acc, [current]: 'unknown' }), {})
    );

  return statsInfo;
}

async function getLinksFullBiography(page) {
  const links = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="fullbio"]')].map((e) =>
      e.getAttribute('href')
    )
  );

  return links;
}

module.exports = {
  isEmpty,
  getLinksFullBiography,
  getInfoStats,
  getDescription,
  getPersonalInfo,
  getPersonalData,
  getNames,
};
