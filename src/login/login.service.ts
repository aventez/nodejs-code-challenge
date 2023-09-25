import axios from 'axios'
import { type User } from './login.types'

class LoginService {
  public async login (username: string, password: string): Promise<User> {
    const response = await axios.post('https://dummyjson.com/auth/login', {
      username,
      password
    })

    if (response.status !== 200) {
      throw new Error('Invalid credentials')
    }

    const user = response.data as User

    return user
  }
}

export default LoginService
