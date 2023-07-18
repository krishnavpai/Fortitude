import { checkRequired } from '../../../lib/utils/check';
import { db } from '../../../lib/mongo';
import attachUid from '../../../lib/attachUid';
import { puppeteer } from 'puppeteer';
import slugify from 'slugify';
import webScraper from '../../../scraper';
export default async function handler(req, res) {
  try {
    req = await attachUid(req, res);
    const { action } = req.query;
    let result;
    switch (req.method) {
      case 'GET':
        switch (action) {
          case 'get':
            result = await scrapeInfo(req);
            break;
          case 'personal':
            result = await getPersonalDetails(req);
            break;
          case 'info':
            result = await getInfo(req);
            break;
        }
        break;
      case 'POST':
        result = await scrapeDetails(req);

        // result = await putInfo(req);
        break;
      case 'DELETE':
        result = await deleteInfo(req);
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

const scrapeInfo = async (req) => {
  return await webScraper.getInfo();
};

const putInfo = async (req) => {
  const { image, name, link } = req.body;
  const slug = slugify(name, { replacement: '-', lower: true });
  const payload = {
    name,
    image,
    link,
    slug,
    type: 'external_expert',
  };
  // return payload;
  return await db.postField('users', payload);
};

const getInfo = async (req) => {
  return await db.getFields('users', { type: 'external_expert' });
};

const deleteInfo = async (req) => {
  // const { slug } = req.body;
  // return await db.deleteField('users', { slug });
  return await db.updateFields(
    'users',
    { type: 'external_expert' },
    { $set: { info: null } }
  );
};

const getPersonalDetails = async (req) => {
  const { slug } = req.query;
  return await db.getField('users', { slug });
};

const scrapeDetails = async (req) => {
  const { slug } = req.body;
  const data = await db.getField('users', { slug });
  const URL = data.link;
  const scrapedInfo = await webScraper.getPersonalInfo(URL);
  if (scrapedInfo) {
    return await db.updateField(
      'users',
      { slug },
      {
        $set: {
          info: scrapedInfo,
        },
      }
    );
  } else throw new Error('Could not scrape data!');
};
