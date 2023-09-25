import 'dotenv/config'
import App from './app'
import CartController from './cart/cart.controller'
import LoginController from './login/login.controller'
import ProductController from './product/product.controller'
import validateEnv from './utils/validateEnv'

validateEnv()

const app = new App(
  [
    new ProductController(),
    new LoginController(),
    new CartController()
  ]
)

app.listen()
