import { PasswordHelpQuestion } from '../../enums/password-help-question.enum';

export class RegisterUserRequest {
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public streetAndNumber: string;
  public zipCode: string;
  public city: string;
  public phoneNumber: string;
  public passwordHelpQuestionAnswer: string;
  public selectedPasswordHelpQuestion: PasswordHelpQuestion;
}
