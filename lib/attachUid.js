import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';

export default async function attachUid(req, res) {
  const token = getCookie('token', { req, res });
  // try {
  const data = jwt.verify(token, process.env.TOKEN_SECRET);
  req.uid = data.uid;
  return req;
  // } catch (error) {
  // console.log(1, error.message);
  // throw new Error();
  // return null;
  // }
}
