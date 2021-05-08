import { Injectable } from '@angular/core';
import { UserApiServiceModule } from '../../../user-api-service.module';
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
    request.zipCode = this._toZipCodeFormat(entity.zipCode.value);
    request.city = entity.city.value;
    request.phoneNumber = entity.phoneNumber.value;
    request.passwordHelpQuestionAnswer = entity.passwordHelpQuestionAnswer.value;
    request.selectedPasswordHelpQuestion = entity.selectedPasswordHelpQuestion;

    return request;
  }

  private _toZipCodeFormat(zipCode: string): string {
    return `${zipCode[0]}${zipCode[1]}-${zipCode[2]}${zipCode[3]}${zipCode[4]}`;
  }
}
