import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountRouting } from '../../../../../../core/configurations/routing/account/account-routing';
import { AppInputModel } from '../../../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppButtonModel } from '../../../../../../shared/components/wrappers/app-button/models/app-button.model';
import { AppInputBasicModel } from '../../../../../../shared/components/wrappers/app-input/models/input-types/app-input-basic.model';
import { AppInputBasicType } from '../../../../../../shared/components/wrappers/app-input/enums/app-input-basic-type.enum';
import { FormControl } from '@angular/forms';
import { EmailAttribute } from '../../../../attributes/email/email-attribute';
import { PasswordReminderHelpQuestionModel } from '../../models/password-reminder-help-question-model';
import { UserApiService } from '../../../../services/user-api.service';
import { PasswordHelpQuestionsFactory } from '../../../registration/factories/password-help-questions-factory';

@Component({
  selector: 'app-password-reminder-user-recognition',
  templateUrl: './password-reminder-user-recognition.component.html',
  styleUrls: [ './password-reminder-user-recognition.component.scss' ]
})
export class PasswordReminderUserRecognitionComponent implements OnInit {
  @Output() readonly goToNextStep = new EventEmitter<PasswordReminderHelpQuestionModel>();

  public get showSpinner(): boolean {
    return this._form.disabled;
  }

  public get disableLogInButton(): boolean {
    return this._form.invalid || this._form.disabled;
  }

  private get _form(): FormControl {
    return this.emailInput.input.formControl;
  }

  public readonly accountRouting = AccountRouting;
  public readonly translateRoute = 'MODULES.ACCOUNT.PAGES.PASSWORD_REMINDER.';

  public emailInput: AppInputModel;
  public errors: string[] = [];

  public button: AppButtonModel;

  private readonly _email = new EmailAttribute();

  constructor(private readonly _userApiService: UserApiService,
              private readonly _passwordHelpQuestionsFactory: PasswordHelpQuestionsFactory) {
  }

  public ngOnInit(): void {
    this.emailInput = new AppInputModel({
      label: {
        text: this._email.translateRoute,
      },
      input: new AppInputBasicModel({
        attribute: this._email,
        type: AppInputBasicType.email,
      }),
    });

    this.button = new AppButtonModel({
      onClick: () => this.getPasswordHelpQuestionAndGoToNextStep(),
      label: {
        text: this.translateRoute + 'STEPS.USER_RECOGNITION.GET_HELP_QUESTION',
      },
    });
  }

  public getPasswordHelpQuestionAndGoToNextStep(): void {
    this._form.disable();

    this._userApiService.getPasswordHelpQuestion(this._email.value)
      .subscribe(value => {
        const questions = this._passwordHelpQuestionsFactory.createPasswordHelpQuestions();
        const userQuestion = questions.find(q => q.value === value);
        const eventData = new PasswordReminderHelpQuestionModel(this._email.value, userQuestion);
        this.goToNextStep.emit(eventData);
      });
  }
}
