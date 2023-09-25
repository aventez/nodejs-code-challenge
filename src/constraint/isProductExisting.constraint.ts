import {
  registerDecorator, ValidatorConstraint, type ValidationArguments, type ValidationOptions, type ValidatorConstraintInterface
} from 'class-validator'
import ProductService from '../product/product.service'

@ValidatorConstraint({ async: true })
export class IsProductExistingConstraint implements ValidatorConstraintInterface {
  async validate (productId: any, args: ValidationArguments): Promise<boolean> {
    // TODO: dependency injection
    const productService = new ProductService()

    const products = await productService.fetchProductsFromApi()
    const product = products.find((product) => product.id === productId)

    return product !== undefined
  }
}

export function IsProductExisting (validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsProductExistingConstraint
    })
  }
}
