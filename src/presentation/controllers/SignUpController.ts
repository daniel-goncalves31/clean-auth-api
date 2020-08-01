import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../protocols/errors/MissingParamError'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.email) {
      return {
        status: 400,
        body: new MissingParamError('email')
      }
    }

    return {
      status: 400,
      body: new MissingParamError('email')
    }
  }
}
