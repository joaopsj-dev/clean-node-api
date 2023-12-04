export class ServerError extends Error {
  constructor (public stack: string) {
    super('Internal server error')
    this.name = 'ServerError'
    console.log(stack);
    this.stack = stack
  }
}
