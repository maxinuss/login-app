import jwt from 'jsonwebtoken'
import { LoginUserInterface, userIsValid } from "../service/UserService";
import { serialize } from 'cookie';

const { JWT_SECRET } = process.env

export const getUserIdFromToken = (token: string) => {
  if (!JWT_SECRET) return false

  const decodedToken: any = jwt.verify(token, JWT_SECRET)

  return decodedToken?.id
}

export const getUserToken = async (params: LoginUserInterface) => {
  const user = await userIsValid(params);
  if(!user.isValid) throw Error('Access Denied')

  const token = jwt.sign(
    { id: user.id },
    JWT_SECRET!,
    { algorithm: 'HS256' }
  );

  return { token }
}

export const setHttpOnlyCookie = (token: string) => {
  return serialize('user-session', token, {
    httpOnly: true,
    secure: process.env.ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
}
