import { Router, type NextFunction, type Request, type Response } from 'express'
import type Controller from '../interfaces/controller.interface'
import ProductService from './product.service'

class ProductController implements Controller {
  public path = '/products'
  public router = Router()

  // TODO: on real app there should be dependency injection pattern
  private readonly productService = new ProductService()

  constructor () {
    this.initializeRoutes()
  }

  private initializeRoutes (): void {
    this.router.get(`${this.path}`, this.getAllProducts)
  }

  private readonly getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const products = await this.productService.fetchProductsFromApi()
    res.send({ products })
  }
}

export default ProductController
