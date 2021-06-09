import { Component, Input, OnInit } from '@angular/core';
import { UserRouting } from '../../../../../../core/configurations/routing/children/user-routing';
import { AppInputModel } from '../../../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppButtonModel } from '../../../../../../shared/components/wrappers/app-button/models/app-button.model';
import { AppInputBasicModel } from '../../../../../../shared/components/wrappers/app-input/models/input-types/app-input-basic.model';
import { AppInputBasicType } from '../../../../../../shared/components/wrappers/app-input/enums/app-input-basic-type.enum';
import { FormControl } from '@angular/forms';
import { TextAttribute } from '../../../../../../shared/attributes/text-attribute';
import { PasswordReminderHelpQuestionModel } from '../../models/password-reminder-help-question-model';
import { UserApiService } from '../../../../services/user-api.service';
import { RemindPasswordRequestModel } from '../../models/requests/remind-password-request-model';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../../../shared/services/error.service';

@Component({
  selector: 'app-password-reminder-user-answer',
  templateUrl: './password-reminder-user-answer.component.html',
  styleUrls: [ './password-reminder-user-answer.component.scss' ]
})
export class PasswordReminderUserAnswerComponent implements OnInit {
  @Input() data: PasswordReminderHelpQuestionModel;

  public get showSpinner(): boolean {
    return this._form.disabled;
  }

  public get disableButton(): boolean {
    return this._form.invalid || this._form.disabled;
  }

  private get _form(): FormControl {
    return this.answerInput.input.formControl;
  }

  public readonly userRouting = UserRouting;
  public readonly translateRoute = 'MODULES.USER.PAGES.PASSWORD_REMINDER.';
  public readonly stepTranslateRoute = this.translateRoute + 'STEPS.USER_ANSWER.';

  public answerInput: AppInputModel;
  public errors: string[] = [];
  public correctAnswer: string;
  public button: AppButtonModel;

  private readonly _answer = new TextAttribute({
    translateRoute: `${this.stepTranslateRoute}ATTRIBUTES.ANSWER.`,
    isRequired: true,
    maxLength: 100
  });

  constructor(private readonly _userApiService: UserApiService,
              private readonly _errorService: ErrorService) {
  }

  public ngOnInit(): void {
    this.answerInput = new AppInputModel({
      label: {
        text: this._answer.translateRoute,
      },
      input: new AppInputBasicModel({
        attribute: this._answer,
        type: AppInputBasicType.text,
      }),
    });

    this.button = new AppButtonModel({
      onClick: () => this.remindPassword(),
      label: {
        text: this.stepTranslateRoute + 'REMIND_PASSWORD',
      },
    });
  }

  public remindPassword(): void {
    this._form.disable();

    const request = new RemindPasswordRequestModel(this.data.email, this._answer.value);
    this._userApiService.remindPassword(request)
      .subscribe(value => {
          this.correctAnswer = value;
          this.errors = [];
        },
        (error: HttpErrorResponse) => {
          this.errors = this._errorService.extractSingleMessageAsCollection(error);
          this._form.enable();
        });
  }
}

