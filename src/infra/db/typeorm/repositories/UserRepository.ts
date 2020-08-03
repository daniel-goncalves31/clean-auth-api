import { AddUserRepository } from '@/data/protocols/AddUserRepository'
import { NewUserModel } from '@/domain/models/NewUser'
import { UserModel } from '@/domain/models/User'
import { UserEntity } from '../entities/UserEntity'
import { getRepository } from 'typeorm'

export class UserTypeOrmRepository implements AddUserRepository {
  async add (newUser: NewUserModel): Promise<UserModel> {
    const repository = getRepository<UserModel>(UserEntity)
    const user = await repository.save(newUser)
    return user
  }
}
