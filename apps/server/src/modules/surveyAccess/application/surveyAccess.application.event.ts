export namespace SurveyAccessApplicationEvent {
  export namespace SurveyAccessCreated {
    export const key = 'surveyAccess.application.surveyAccess.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
