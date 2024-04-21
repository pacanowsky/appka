export namespace QuestionApplicationEvent {
  export namespace QuestionCreated {
    export const key = 'question.application.question.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
