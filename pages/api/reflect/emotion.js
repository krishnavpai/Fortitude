import { checkRequired } from "../../../lib/utils/check";
import moment from "moment";
import { db } from "../../../lib/mongo";
import attachUid from "../../../lib/attachUid";
export default async function handler(req, res) {
  try {
    req = await attachUid(req, res);
    const result = await emotions[`${req.method.toLowerCase()}${modifier}`](
      req
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

const emotions = {};
const modifier = "Emotion";

//  schema
const emotionsEntry = {
  uid: 1,
  pid: 1,
  date: "dd-mm-yyyy",
  emotions: [],
  createdAt: 1,
  updatedAt: 1,
  type: "emotions",
};

emotions.getEmotion = async (req) => {
  const keys = {
    uid: req.uid,
    type: "emotions",
    date: moment().format("D-M-YYYY"),
  };
  return (await db.getField("journal", keys)) || {};
};
emotions.postEmotion = async (req) => {
  const data = req.body;
  const uid = req.uid;
  const emotionsArray = data.emotions;
  if (!Array.isArray(emotionsArray))
    throw new Error("Invalid type for emotions");
  const keys = {
    uid,
    type: "emotions",
    date: moment().format("D-M-YYYY"),
  };
  const present = await db.getField("journal", keys);
  if (present) {
    const updates = {
      $set: {
        emotions: emotionsArray || [],
        updatedAt: Date.now(),
      },
    };
    return await db.updateField("journal", keys, updates);
  }
  const pid = await db.incrId("pid");
  const payload = {
    uid,
    pid,
    date: moment().format("D-M-YYYY"),
    emotions: emotionsArray || [],
    createdAt: Date.now(),
    type: "emotions",
  };
  return await db.postField("journal", payload);
};
