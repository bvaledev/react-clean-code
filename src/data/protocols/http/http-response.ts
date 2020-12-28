export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  unauthorized = 401,
  badRequest = 400
}
export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
