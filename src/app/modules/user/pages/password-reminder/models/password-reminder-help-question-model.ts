import { PasswordHelpQuestionModel } from '../../registration/models/password-help-question-model';

export class PasswordReminderHelpQuestionModel {
  constructor(public readonly email: string,
              public readonly question: PasswordHelpQuestionModel) {
  }
}
