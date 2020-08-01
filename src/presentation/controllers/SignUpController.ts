import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/Controller'
import { Validator } from '../protocols/Validator'

export class SignUpController implements Controller {
  constructor (private readonly validator: Validator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validator.validate(httpRequest.body)
    return {} as any
  }
}
