import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest } from '../protocols/http-responses'
import { MissingParamError, InvalidParamError } from '../protocols/errors'
import { Controller } from '../protocols/Controller'

export class SignUpController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest

    if (!body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!body.email) {
      return badRequest(new MissingParamError('email'))
    }

    if (!body.password) {
      return badRequest(new MissingParamError('password'))
    }

    if (!body.confirmPassword) {
      return badRequest(new MissingParamError('confirmPassword'))
    }

    return badRequest(new InvalidParamError('confirmPassword'))
  }
}
