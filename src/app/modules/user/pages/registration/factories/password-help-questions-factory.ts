import { Injectable } from '@angular/core';
import { UserApiServiceModule } from '../../../user-api-service.module';
import { PasswordHelpQuestion } from '../enums/password-help-question.enum';
import { TranslateService } from '@ngx-translate/core';
import { ValueTextPairModel } from '../../../../../shared/models/value-text-pair-model';

@Injectable({
  providedIn: UserApiServiceModule
})
export class PasswordHelpQuestionsFactory {
  constructor(private readonly _translateService: TranslateService) {
  }

  public createPasswordHelpQuestions(): ReadonlyArray<ValueTextPairModel<PasswordHelpQuestion>> {
    const translateRoute = 'MODULES.USER.ENUMS.PASSWORD_HELP_QUESTION.';
    const questions: ValueTextPairModel<PasswordHelpQuestion>[] = [];

    questions.push(new ValueTextPairModel<PasswordHelpQuestion>(
      PasswordHelpQuestion.DogName, this._translateService.instant(translateRoute + 'DOG_NAME')));

    questions.push(new ValueTextPairModel<PasswordHelpQuestion>(
      PasswordHelpQuestion.FriendName, this._translateService.instant(translateRoute + 'FRIEND_NAME')));

    questions.push(new ValueTextPairModel<PasswordHelpQuestion>(
      PasswordHelpQuestion.BandName, this._translateService.instant(translateRoute + 'BAND_NAME')));

    return questions;
  }
}
