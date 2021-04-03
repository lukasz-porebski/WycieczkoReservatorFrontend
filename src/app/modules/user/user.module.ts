import { NgModule } from '@angular/core';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserRoutingModule } from './user-routing.module';
import { UserApiServiceModule } from './user-api-service.module';
import { UserComponent } from './user.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PasswordReminderComponent } from './pages/password-reminder/password-reminder.component';
import { PasswordReminderUserRecognitionComponent } from './pages/password-reminder/components/password-reminder-user-recognition/password-reminder-user-recognition.component';
import { PasswordReminderUserAnswerComponent } from './pages/password-reminder/components/password-reminder-user-answer/password-reminder-user-answer.component';
import { PasswordChangerComponent } from './pages/password-changer/password-changer.component';

@NgModule({
  imports: [
    UserRoutingModule,
    MatProgressSpinnerModule,
    UserApiServiceModule,
    SharedModule
  ],
  declarations: [
    UserComponent,
    LogInComponent,
    RegistrationComponent,
    PasswordReminderComponent,
    PasswordReminderUserRecognitionComponent,
    PasswordReminderUserAnswerComponent,
    PasswordChangerComponent
  ],
})
export class UserModule {
}
