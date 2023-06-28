import crypto from 'crypto';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const generateAccessToken = (
  payload: any,
  expiresIn: string
): string => {
  if (expiresIn == '') {
    expiresIn = '1h';
  }

  const secretKey: string = 'YOUR_SECRET_KEY'; // トークンの署名に使用するシークレットキー

  // トークンの署名
  const token: string = jwt.sign(payload, secretKey, { expiresIn: expiresIn });

  return token;
};

export const verifyAccessToken = (token: string): any => {
  const secretKey: string = 'YOUR_SECRET_KEY'; // トークンの署名に使用するシークレットキー

  try {
    const decoded: any = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // トークンの有効期限が切れている場合の処理
      throw new Error('Token has expired');
    } else if (error instanceof JsonWebTokenError) {
      // トークンの署名が正しくない場合の処理
      throw new Error('Invalid token');
    } else {
      // その他のエラー処理
      throw new Error('Error while verifying token');
    }
  }
};
