import { HttpResponse } from './http'

export const badRequest = (error: Error): HttpResponse => ({
  status: 400,
  body: error
})
