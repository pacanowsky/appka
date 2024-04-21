export namespace OptionApplicationEvent {
  export namespace OptionCreated {
    export const key = 'option.application.option.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
