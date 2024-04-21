export namespace ThemeApplicationEvent {
  export namespace ThemeCreated {
    export const key = 'theme.application.theme.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
