export namespace AnswerApplicationEvent {
  export namespace AnswerCreated {
    export const key = 'answer.application.answer.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
