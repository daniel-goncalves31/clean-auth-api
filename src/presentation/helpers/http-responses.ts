import { HttpResponse } from '../protocols/http'
import { ServerError } from '../protocols/errors/ServerError'

export const badRequest = (error: Error): HttpResponse => ({
  status: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  status: 500,
  body: new ServerError()
})
