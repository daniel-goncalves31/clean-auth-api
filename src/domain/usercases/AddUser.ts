import { NewUserModel } from '../models/NewUser'
import { UserModel } from '../models/User'

export interface AddUserUseCase {
  add(newUser: NewUserModel): Promise<UserModel>
}
