import bodyParser from 'body-parser'
import express, { type Application } from 'express'
import type Controller from './interfaces/controller.interface'
import errorMiddleware from './middleware/error.middleware'
import { requireEnv } from './utils/requireEnv'

class App {
  public app: express.Application

  constructor (controllers: Controller[]) {
    this.app = express()

    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
  }

  public listen (): void {
    const port = requireEnv('PORT')

    this.app.listen(port, () => {
      console.log(`* App listening on the port ${port}`)
    })
  }

  public getServer (): Application {
    return this.app
  }

  private initializeMiddlewares (): void {
    this.app.use(bodyParser.json())
  }

  private initializeErrorHandling (): void {
    this.app.use(errorMiddleware)
  }

  private initializeControllers (controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }
}

export default App
