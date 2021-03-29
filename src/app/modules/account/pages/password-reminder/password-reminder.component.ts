import { Component } from '@angular/core';
import { MatHorizontalStepper, MatStep } from '@angular/material/stepper';
import { PasswordReminderHelpQuestionModel } from './models/password-reminder-help-question-model';

@Component({
  selector: 'app-password-reminder',
  templateUrl: './password-reminder.component.html',
  styleUrls: [ './password-reminder.component.scss' ]
})
export class PasswordReminderComponent {
  public readonly translateRoute = 'MODULES.ACCOUNT.PAGES.PASSWORD_REMINDER.';

  public questionModel: PasswordReminderHelpQuestionModel;

  public goToNextStep(data: PasswordReminderHelpQuestionModel,
                      stepper: MatHorizontalStepper,
                      firstStep: MatStep): void {
    this.questionModel = data;
    firstStep.completed = true;
    stepper.next();
  }
}

