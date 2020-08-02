import { AddUserUseCase } from '@/domain/usercases/AddUser'
import { NewUserModel } from '@/domain/models/NewUser'
import { UserModel } from '@/domain/models/User'
import { Encrypter } from '../protocols/Encrypter'

export class DbAddUserUseCase implements AddUserUseCase {
  constructor (private readonly encrypter: Encrypter) {}

  async add (newUser: NewUserModel): Promise<UserModel> {
    await this.encrypter.encrypt(newUser.password)
    return {} as any
  }
}
