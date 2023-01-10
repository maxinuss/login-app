import bodyParser from 'body-parser'
import express from "express";
import { createUser, getUserData } from "./service/UserService";
import { responseFailTemplate, responseSuccessTemplate } from "./common/ResponseService";
import { getUserToken, setHttpOnlyCookie } from "./common/AuthService";
import { authMiddleware } from "./middlewares/AuthMiddleware";

function genericRoutes() {
  const router = express.Router();
  router.get('/health', async (_req: any, res: any) => {
    const result = {
      status: 'OK',
      timestamp: Date.now(),
    }

    res.status(200).json(result)
  })

  return router
}

function userRoutes() {
  const router = express.Router();

  router.post('', async (req: any, res: any) => {
    try {
      const result = await createUser(req.body)

      res.status(201).json(responseSuccessTemplate(result))
    } catch (e) {
      res.status(400).json(responseFailTemplate(e))
    }
  })

  router.post('/login', async (req: any, res: any) => {
    try {
      const result = await getUserToken(req.body)

      res.setHeader('Set-Cookie', setHttpOnlyCookie(result.token));
      res.status(200).json(responseSuccessTemplate(result))
    } catch (e) {
      res.status(401).json(responseFailTemplate(e))
    }
  })

  router.get('', authMiddleware, async (req: any, res: any) => {
    try {
      const result = await getUserData(req.query.userId)

      res.status(200).json(responseSuccessTemplate(result))
    } catch (e) {
      res.status(401).json(responseFailTemplate(e))
    }
  })

  router.get('/logout', authMiddleware, async (_req: any, res: any) => {
    try {
      res.clearCookie('user-session', { httpOnly: true });

      res.status(200).json(responseSuccessTemplate({}))
    } catch (e) {
      res.status(401).json(responseFailTemplate(e))
    }
  })

  return router
}

export const initRoutes = (app: any) => {
  app.use(bodyParser.json())
  app.use('/api/v1', genericRoutes())
  app.use('/api/v1/user', userRoutes())
}
