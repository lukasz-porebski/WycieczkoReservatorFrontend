import { Injectable } from '@angular/core';
import { UserApiServiceModule } from '../../../user-api-service.module';
import { PasswordHelpQuestion } from '../enums/password-help-question.enum';
import { TranslateService } from '@ngx-translate/core';
import { ValueTextPairModel } from '../../../../../shared/models/value-text-pair-model';
import { RegisterUserRequest } from '../models/requests/register-user-request';
import { RegistrationEntity } from '../entities/registration-entity';

@Injectable({
  providedIn: UserApiServiceModule
})
export class RegistrationRequestFactory {

  public createRegister(entity: RegistrationEntity): RegisterUserRequest {
    const request = new RegisterUserRequest();

    request.email = entity.email.value;
    request.password = entity.password.value;
    request.firstName = entity.firstName.value;
    request.lastName = entity.lastName.value;
    request.streetAndNumber = entity.streetAndNumber.value;
    request.zipCode = entity.zipCode.value;
    request.city = entity.city.value;
    request.phoneNumber = entity.phoneNumber.value;
    request.passwordHelpQuestionAnswer = entity.passwordHelpQuestionAnswer.value;
    request.selectedPasswordHelpQuestion = entity.selectedPasswordHelpQuestion;

    return request;
  }
}
