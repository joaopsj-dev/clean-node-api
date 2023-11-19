export class SignUpController {
  handle (httpRequest: any): any {
    return {
      body: new Error('Missing param: error'),
      statusCode: 400
    }
  }
}
