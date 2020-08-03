import { EntitySchema } from 'typeorm'
import { UserModel } from '@/domain/models/User'

export const UserEntity = new EntitySchema<UserModel>({
  name: 'user',
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    name: {
      type: 'varchar'
    },
    email: {
      type: 'varchar',
      unique: true
    },
    password: {
      type: 'varchar'
    }
  }
})
