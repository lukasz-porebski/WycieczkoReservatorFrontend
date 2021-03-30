import { Injectable } from '@angular/core';
import { UserApiServiceModule } from '../../../user-api-service.module';
import { PasswordHelpQuestionModel } from '../models/password-help-question-model';
import { PasswordHelpQuestion } from '../enums/password-help-question.enum';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: UserApiServiceModule
})
export class PasswordHelpQuestionsFactory {
  constructor(private readonly _translateService: TranslateService) {
  }

  public createPasswordHelpQuestions(): ReadonlyArray<PasswordHelpQuestionModel> {
    const translateRoute = 'MODULES.USER.ENUMS.PASSWORD_HELP_QUESTION.';
    const questions: PasswordHelpQuestionModel[] = [];

    questions.push(new PasswordHelpQuestionModel(
      PasswordHelpQuestion.DogName, this._translateService.instant(translateRoute + 'DOG_NAME')));

    questions.push(new PasswordHelpQuestionModel(
      PasswordHelpQuestion.FriendName, this._translateService.instant(translateRoute + 'FRIEND_NAME')));

    questions.push(new PasswordHelpQuestionModel(
      PasswordHelpQuestion.BandName, this._translateService.instant(translateRoute + 'BAND_NAME')));

    return questions;
  }
}
