import getUser from '../../../lib/getUser';
import { checkRequired } from '../../../lib/utils/check';
import moment from 'moment';
import { db } from '../../../lib/mongo';
import attachUid from '../../../lib/attachUid';
export default async function handler(req, res) {
  try {
    req = await attachUid(req, res);
    const result = await journal[`${req.method.toLowerCase()}${modifier}`](req);
    res.json(result);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

const journal = {};
const modifier = 'Journal';

//  schema
const journalentry = {
  uid: 1,
  pid: 1,
  title: '',
  body: '',
  emotions: [],
  createdAt: 1,
  updatedAt: 1,
  type: 'journal_entry',
};
const refs = {
  now: moment().unix(),
  then: moment().endOf('day').unix(),
  yesstart: moment().startOf('day').unix(),
  last: moment().subtract(1, 'day').endOf('day').unix(),
  time: moment().format('D-M-YYYY'),
};

journal.getJournal = async (req) => {
  const uid = parseInt(req.uid);
  const keys = {
    type: 'journal_entry',
    uid,
  };
  if (req.query.time == 'yesterday') {
    keys.createdAt = {
      $lte: moment().startOf('day').valueOf(),
      $gte: moment().subtract(1, 'day').startOf('day').valueOf(),
    };
  } else if (req.query.time == 'today') {
    keys.createdAt = {
      $gte: moment().startOf('day').valueOf(),
    };
  }
  return await db.getFields('journal', keys, { sort: { createdAt: -1 } });
};

journal.postJournal = async (req) => {
  checkRequired(req, ['title', 'body']);
  const data = req.body;
  const { title, body, emotions } = req.body;
  const uid = parseInt(req.uid);
  const pid = await db.incrId('pid');
  const payload = {
    uid,
    pid,
    title,
    body,
    emotions: emotions || [],
    createdAt: Date.now(),
    type: 'journal_entry',
  };
  const res = await db.postField('journal', payload);
  if (res) return res;
  else throw new Error('Could not post!');
};

journal.putJournal = async (req) => {
  checkRequired(req, ['pid']);
  const data = req.body;
  const uid = parseInt(req.uid);
  const pid = parseInt(data.pid);
  const updates = {
    $set: {},
  };
  let e = ['body', 'title', 'emotions'].map((e) => {
    if (data[e]) updates.$set[e] = data[e];
  });
  updates.$set.updatedAt = Date.now();
  return await db.updateField(
    'journal',
    {
      uid,
      pid,
      type: 'journal_entry',
    },
    updates
  );
};

journal.deleteJournal = async (req) => {
  checkRequired(req, ['pid']);
  const data = req.body;
  const uid = parseInt(req.uid);
  const pid = parseInt(data.pid);
  return await db.deleteField('journal', { uid, pid, type: 'journal_entry' });
};
