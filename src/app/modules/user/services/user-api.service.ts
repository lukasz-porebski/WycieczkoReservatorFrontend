import { Injectable } from '@angular/core';
import { UserApiServiceModule } from '../user-api-service.module';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';
import { RemindPasswordRequestModel } from '../pages/password-reminder/models/requests/remind-password-request-model';
import { PasswordHelpQuestion } from '../pages/registration/enums/password-help-question.enum';
import { ChangePasswordRequestModel } from '../pages/password-changer/models/requests/change-password-request-model';
import { RegisterUserRequest } from '../pages/registration/models/requests/register-user-request';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: UserApiServiceModule
})
export class UserApiService {

  private readonly _baseUrl = `${this._http.baseUrl}/account`;

  constructor(private readonly _http: HttpService) {
  }

  public register(request: RegisterUserRequest): Observable<any> {
    return this._http.post(this._baseUrl, request);
  }

  public changePassword(request: ChangePasswordRequestModel): Observable<void> {
    return this._http.put(`${this._baseUrl}/change-password`, request);
  }

  public getPasswordHelpQuestion(email: string): Observable<PasswordHelpQuestion> {
    const httpParams = new HttpParams()
      .append('email', email);

    return this._http.get<PasswordHelpQuestion>(`${this._baseUrl}/security-question`, {
      params: httpParams
    });
  }

  public remindPassword(request: RemindPasswordRequestModel): Observable<string> {
    return this._http.postText(`${this._baseUrl}/remind-password`, request);
  }
}
