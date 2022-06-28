import { Request, Response } from 'express';
import config from 'config';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';

export async function loginHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).json({
      success: false,
      massage: 'Invalid email or password',
    });
  }
  const accessToken = signJwt(
    {
      user,
    },
    'accessTokenPrivateKey',
    { expiresIn: config.get('accessTokenTtl') },
  );
  return res.status(200).json({
    success: true,
    massage: 'Success login',
    data: user,
    token: accessToken,
  });
}
