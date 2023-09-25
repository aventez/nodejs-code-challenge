import { Router, type NextFunction, type Request, type Response } from 'express'
import type Controller from '../interfaces/controller.interface'
import authMiddleware from '../middleware/auth.middleware'
import validationMiddleware from '../middleware/validation.middleware'
import CartService from './cart.service'
import { AddProductToCartDto } from './dto/addProductToCart.dto'

class CartController implements Controller {
  public path = '/cart'
  public router = Router()

  // TODO: on real app there should be dependency injection pattern
  private readonly cartService = new CartService()

  constructor () {
    this.initializeRoutes()
  }

  private initializeRoutes (): void {
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(AddProductToCartDto), this.addProductToCart)
  }

  private readonly addProductToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await this.cartService.addProductToUserCart(req.user?.id, req.body.productId)

    res.status(201).send()
  }
}

export default CartController
