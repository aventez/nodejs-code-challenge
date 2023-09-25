/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type Cart } from './cart.types'

class CartService {
  private readonly carts = new Map<number, Cart>()

  async getUserCart (userId: number): Promise<Cart> {
    if (!this.carts.has(userId)) {
      this.carts.set(userId, new Set())
    }

    return this.carts.get(userId)!
  }

  async addProductToUserCart (userId: number, productId: number): Promise<void> {
    const userCart = await this.getUserCart(userId)
    userCart.add(productId)
  }

  async removeProductFromUserCart (userId: number, productId: number): Promise<void> {
    const userCart = await this.getUserCart(userId)
    userCart.delete(productId)
  }
}

export default CartService
