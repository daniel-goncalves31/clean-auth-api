import { HttpResponse } from '../protocols/http'
import { ServerError } from '../protocols/errors'

export const badRequest = (error: Error): HttpResponse => ({
  status: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  status: 500,
  body: new ServerError()
})

export const ok = (data: any): HttpResponse => ({
  status: 200,
  body: data
})
