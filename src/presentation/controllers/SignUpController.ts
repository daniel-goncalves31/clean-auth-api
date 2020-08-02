import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/Controller'
import { Validator } from '../protocols/Validator'
import { badRequest } from '../helpers/http-responses'

export class SignUpController implements Controller {
  constructor (private readonly validator: Validator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return {} as any
  }
}
