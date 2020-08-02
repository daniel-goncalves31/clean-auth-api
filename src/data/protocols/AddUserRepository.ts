import { NewUserModel } from '@/domain/models/NewUser'
import { UserModel } from '@/domain/models/User'

export interface AddUserRepository {
  add(newUser: NewUserModel): Promise<UserModel>
}
