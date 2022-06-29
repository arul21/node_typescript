import { Request, Response } from 'express';
import config from 'config';
import { validatePassword, registerUser } from '../services/auth.service';
import { signJwt } from '../utils/jwt.utils';
import UserModel from '../models/user.model';

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
    accessToken,
  });
}

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const response = await registerUser(req.body);
    return res.status(200).json({
      success: true,
      massage: 'Success register',
      data: response,
    });
  } catch (e: any) {
    return res.status(409).json({
      success: false,
      massage: 'Email already taken!',
    });
  }
};
