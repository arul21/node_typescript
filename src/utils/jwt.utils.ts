import jwt from 'jsonwebtoken';
import config from 'config';

export function signJwt(
  object: Object,
  keyName: 'accessTokenPrivateKey',
  options?: jwt.SignOptions | undefined,
) {
  return jwt.sign(object, config.get<string>(keyName), {
    ...(options && options),
  });
}

export function verifyJwt(token: string, keyName: 'accessTokenPublicKey') {
  const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString(
    'ascii',
  );

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
