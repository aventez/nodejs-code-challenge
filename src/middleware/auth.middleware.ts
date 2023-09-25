import { type NextFunction, type Request, type Response } from 'express'
import * as jwt from 'jsonwebtoken'

async function authMiddleware (request: Request, response: Response, next: NextFunction): Promise<any> {
  const token = request.headers.authorization?.split(' ')[1]

  if (token == null) {
    return response.status(401).send({ message: 'Unauthorized' })
  }

  try {
    /* 💀 It is only for demo purposes. On production environment we must change it
        to jwt.verify() due to the need of signature verification. We won't know the signature
        as long as token source is an external API. */
    const payload = jwt.decode(token) as jwt.JwtPayload

    request.user = { id: payload.userId }

    next()
  } catch (error) {
    return response.status(401).send({ message: 'Unauthorized' })
  }
}

export default authMiddleware
