import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../protocols/errors/MissingParamError'
import { badRequest } from '../protocols/http-responses'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
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

    return badRequest(new MissingParamError('confirmPassword'))
  }
}
