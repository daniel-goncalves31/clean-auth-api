import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/Controller'
import { Validator } from '../protocols/Validator'
import { badRequest } from '../helpers/http-responses'
import { AddUserUseCase } from '@/domain/usercases/AddUser'

export class SignUpController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly addUserUseCase: AddUserUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { name, email, password } = httpRequest.body
    this.addUserUseCase.add({ name, email, password })
    return {} as any
  }
}
