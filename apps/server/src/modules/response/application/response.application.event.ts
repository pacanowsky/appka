export namespace ResponseApplicationEvent {
  export namespace ResponseCreated {
    export const key = 'response.application.response.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
