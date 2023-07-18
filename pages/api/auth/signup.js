import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import { db } from '../../../lib/mongo';
import bcrypt from 'bcrypt';
import { checkRequired } from '../../../lib/utils/check';
export default async function handler(req, res) {
  try {
    checkRequired(req, ['email', 'password', 'name']);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
  const { name, email, password } = req.body;
  const saltRounds = 10;
  if (req.method === 'POST') {
    const userExist = await db.getField('users', { email });

    if (userExist)
      return res.status(422).json({ message: 'Email already in use!' });

    const uid = await db.incrId('uid');

    bcrypt.hash(password, saltRounds).then(async function (hash) {
      const user = await db.postField('users', {
        uid,
        name,
        email,
        hashedpassword: hash,
        type: 'normal',
      });
      console.log(user);
      delete user._id;
      delete user.hashedpassword;

      const token = jwt.sign({ uid, name, email }, process.env.TOKEN_SECRET, {
        expiresIn: '7d',
      });

      setCookie('token', token, {
        req,
        res,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      res.status(201).json(user);
    });
  } else {
    res.status(424).json({ message: 'Invalid method!' });
  }
}
