// import { getUserIdFromToken } from '../common/AuthService'
import { responseFailTemplate } from '../common/ResponseService'
import cookie from 'cookie'
import {getUserIdFromToken} from "../common/AuthService";

export const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const JWT = cookies['user-session'];
    const userId = getUserIdFromToken(JWT)
    if (userId) {
      req.query.userId = userId
    } else {
      throw Error('Not Authorized')
    }

    next()
  } catch (e) {
    res.status(401).json(responseFailTemplate(e))
  }
}
