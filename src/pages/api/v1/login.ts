// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { cookie } from '@/lib/cookie';
import { createJWTFromUser, verifyPassword } from '@/lib/crypto';
import { connectToDatabase } from '@/lib/mongo';
import { User } from '@/lib/mongoose/User';
import type { NextApiRequest, NextApiResponse } from 'next'

const methods = {
  GET: (req: NextApiRequest, res: NextApiResponse) => _get(req, res),
  HEAD: (req: NextApiRequest, res: NextApiResponse) => _head(req, res),
  POST: (req: NextApiRequest, res: NextApiResponse) => _post(req, res),
  PUT: (req: NextApiRequest, res: NextApiResponse) => _put(req, res),
  DELETE: (req: NextApiRequest, res: NextApiResponse) => _delete(req, res),
  UPDATE: (req: NextApiRequest, res: NextApiResponse) => _update(req, res),
  OPTIONS: (req: NextApiRequest, res: NextApiResponse) => _options(req, res),
  TRACE: (req: NextApiRequest, res: NextApiResponse) => _trace(req, res),
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectToDatabase();
  const method = req.method ?? 'GET';
  if (Object.hasOwn(methods, method))
    await methods[method as keyof typeof methods](req, res);
}

async function _get(req: NextApiRequest, res: NextApiResponse) {
  res.status(500).send('Method does not exist for this route');
}

async function _post(req: NextApiRequest, res: NextApiResponse) {

  const { email, password } = req.body;

  //400
  for (const value of [email, password]) {
    if (!value || typeof value != 'string') {
      res.status(400).json({ status: 400, err: 'Bad Request' });
      return;
    }
  }

  const user = await User.findOne({ where: { email } }, {
    email: true,
    password: true,
    screenname: true
  });

  //401
  if (!user || !await verifyPassword(user, password)) {
    res.status(401).json({ status: 401, err: 'Unauthorized' });
    return;
  }

  const token = createJWTFromUser(user);
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  res.setHeader('Set-Cookie', cookie({
    key: 'token',
    value: token,
    path: '/',
    sameSite: 'Strict',
    expires,
    httpOnly: true,
    secure: true
  }));

  //200
  res.status(200).json({ status: 200, token })
}

async function _put(req: NextApiRequest, res: NextApiResponse) {
  res.status(500).send('Method does not exist for this route');
}

async function _delete(req: NextApiRequest, res: NextApiResponse) {
  res.status(500).send('Method does not exist for this route');
}

async function _head(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(500).send('Method does not exist for this route');
}
async function _update(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(500).send('Method does not exist for this route');
}

async function _trace(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(500).send('Method does not exist for this route');
}

async function _options(req: NextApiRequest, res: NextApiResponse) {
  res.status(500).send('Method does not exist for this route');
}
