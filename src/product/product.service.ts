import axios from 'axios'
import { type Product } from './product.types'

class ProductService {
  public async fetchProductsFromApi (sortAlphabetically = true): Promise<Product[]> {
    const response = await axios.get('https://dummyjson.com/products')
    const products: Product[] = response.data.products

    if (sortAlphabetically) {
      products.sort((a, b) => a.title.localeCompare(b.title))
    }

    return products
  }
}

export default ProductService
