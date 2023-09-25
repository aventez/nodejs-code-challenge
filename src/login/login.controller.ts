import { Router, type NextFunction, type Request, type Response } from 'express'
import type Controller from '../interfaces/controller.interface'
import validationMiddleware from '../middleware/validation.middleware'
import { LoginDto } from './dto/login.dto'
import LoginService from './login.service'

class LoginController implements Controller {
  public path = '/login'
  public router = Router()

  // TODO: on real app there should be dependency injection pattern
  private readonly loginService = new LoginService()

  constructor () {
    this.initializeRoutes()
  }

  private initializeRoutes (): void {
    this.router.post(`${this.path}`, validationMiddleware(LoginDto), this.loginUser)
  }

  private readonly loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.loginService.login(req.body.username, req.body.password)

      res.send(user)
    } catch (err: any) {
      res.status(401).send({ message: err.message })
    }
  }
}

export default LoginController
