const puppeteer = require('puppeteer');
const webScraper = {};

webScraper.getInfo = async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //   await preparePageForTests(page);
  await page.goto(
    'https://www.buffalo.edu/news/faculty-experts/expertise/psychology-and-mental-health.html'
  );
  const details = await page.evaluate(() => {
    const COUNT = 5;
    // const elements = Array.from(document.querySelectorAll('.teaser-body a b'));
    let links = Array.from(
      document.querySelectorAll('li .teaser-image > a')
    ).slice(0, COUNT);
    let names = Array.from(
      document.querySelectorAll('li .teaser-body a b')
    ).slice(0, COUNT);
    // let images = Array.from(
    //   document.querySelectorAll('li .teaser-image > a > picture > img')
    // ).slice(0, 5);
    names = names.map((e) => e.textContent);
    links = links.map((e) => e.getAttribute('href'));
    const data = names.map((e, i) => ({
      name: e,
      link: links[i],
    }));
    // images = images.map((e) => e.getAttribute('src').slice(2));
    return data;
  });
  await browser.close();
  return details;
};

webScraper.getPersonalInfo = async (URL) => {
  //   const URL = req.body.url;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(URL);
  const info = await page.evaluate(() => {
    let paras = Array.from(
      document.querySelectorAll('.image-container + div p')
    );
    let contacts = Array.from(
      document.querySelectorAll('.image-container + div + div + div + div li')
    );
    const image =
      'https://www.buffalo.edu/' +
      document.querySelector('.image-container img').getAttribute('src');
    paras = paras.map((e) => e.textContent);
    contacts = contacts.map((e) => ({
      content: e.textContent,
      site: e.querySelector('a')?.getAttribute('href'),
    }));
    return { paras, contacts, image };
  });
  return info;
};
module.exports = webScraper;
