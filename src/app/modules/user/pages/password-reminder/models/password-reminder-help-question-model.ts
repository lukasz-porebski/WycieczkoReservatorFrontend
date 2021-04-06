import { ValueTextPairModel } from '../../../../../shared/models/value-text-pair-model';
import { PasswordHelpQuestion } from '../../registration/enums/password-help-question.enum';

export class PasswordReminderHelpQuestionModel {
  constructor(public readonly email: string,
              public readonly question: ValueTextPairModel<PasswordHelpQuestion>) {
  }
}
