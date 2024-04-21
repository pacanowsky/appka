export namespace SurveyApplicationEvent {
  export namespace SurveyCreated {
    export const key = 'survey.application.survey.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
