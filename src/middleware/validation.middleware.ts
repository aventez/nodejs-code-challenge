/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { plainToClass } from 'class-transformer'
import { validate, type ValidationError } from 'class-validator'
import { type RequestHandler } from 'express'
import HttpException from '../exceptions/HttpException'

function validationMiddleware<T> (type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => {
            if (error.constraints) {
              return Object.values(error.constraints).join(', ')
            } else {
              return 'Unknown error'
            }
          }).join(', ')
          next(new HttpException(400, message))
        } else {
          next()
        }
      })
  }
}

export default validationMiddleware
