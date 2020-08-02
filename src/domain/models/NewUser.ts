import { UserModel } from './User'

export type NewUserModel = Omit<UserModel, 'id'>
