import { checkRequired } from '../../../lib/utils/check';
import moment from 'moment';
import { db } from '../../../lib/mongo';
import attachUid from '../../../lib/attachUid';
export default async function handler(req, res) {
  try {
    req = await attachUid(req, res);
    const result = await mood[`${req.method.toLowerCase()}${modifier}`](req);
    res.json(result);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

const mood = {};
const modifier = 'Mood';

mood.getMood = async (req) => {
  const uid = req.uid;
  let c = 8;
  let dateArr = [];
  let dayArr = [];
  let dateDayArr = [];
  while (c--) {
    dateDayArr.push({
      date: moment().subtract(c, 'day').format('D-M-YYYY'),
      day: moment().subtract(c, 'day').format('ddd'),
    });
  }
  let result = await Promise.all(
    dateDayArr.map(async (e) => {
      const { date } = e;
      let data = await db.getField('journal', {
        date,
        uid,
        type: 'emotions',
      });
      if (!data) return { ...e, id: 0 };
      return { ...e, id: data.emotions[0]?.id };
    })
  );
  const vals = result.map((e) => e.id);
  const days = result.map((e) => e.day);
  // return result;
  // return result;
  // const vals = result.map((e) => {
  //   if (e.emotions.length) {
  //     return e.emotions[0].id;
  //   } else return 1;
  // });
  //   dayArr = result.map((e) => {
  //     return moment(e.date).format("D");
  //   });
  return { y: vals, x: days };
};
