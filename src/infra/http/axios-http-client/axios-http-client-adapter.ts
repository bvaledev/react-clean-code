import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClientAdapter implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>
    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      return {
        statusCode: error.response.status,
        body: error.response.data
      }
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
