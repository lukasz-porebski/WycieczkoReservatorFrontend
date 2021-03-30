import { PasswordHelpQuestion } from '../enums/password-help-question.enum';

export class PasswordHelpQuestionModel {
  constructor(public readonly value: PasswordHelpQuestion,
              public readonly text: string) {
  }
}
