import { IsNotEmpty, IsNumber } from 'class-validator'
import { IsProductExisting } from '../../constraint/isProductExisting.constraint'

export class AddProductToCartDto {
  @IsNotEmpty()
  @IsNumber()
  @IsProductExisting()
    productId: number
}
