/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import type HttpException from '../exceptions/HttpException'

async function errorMiddleware (error: HttpException, request: Request, response: Response, next: NextFunction): Promise<any> {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  response
    .status(status)
    .send({
      message,
      status
    })
}

export default errorMiddleware
