import { AddUserUseCase } from '@/domain/usercases/AddUser'
import { NewUserModel } from '@/domain/models/NewUser'
import { UserModel } from '@/domain/models/User'
import { Encrypter } from '../protocols/Encrypter'
import { AddUserRepository } from '../protocols/AddUserRepository'

export class DbAddUserUseCase implements AddUserUseCase {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addUserRespository: AddUserRepository
  ) {}

  async add (newUser: NewUserModel): Promise<UserModel> {
    const hashedPassword = await this.encrypter.encrypt(newUser.password)

    const user = this.addUserRespository.add({
      ...newUser,
      password: hashedPassword
    })
    return user
  }
}
