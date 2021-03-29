import { Injectable } from '@angular/core';
import { AccountApiServiceModule } from '../account-api-service.module';
import { HttpService } from '../../../core/services/http.service';
import { Observable, of } from 'rxjs';
import { AccessTokenApiModel } from '../../../core/user-identity/models/apis/access-token-api.model';
import { map } from 'rxjs/operators';
import { RemindPasswordRequestModel } from '../pages/password-reminder/models/requests/remind-password-request-model';
import { PasswordHelpQuestion } from '../pages/registration/enums/password-help-question.enum';

@Injectable({
  providedIn: AccountApiServiceModule
})
export class UserApiService {

  private readonly _baseUrl = `${this._http.baseUrl}/user/`;

  constructor(private readonly _http: HttpService) {
  }

  public getPasswordHelpQuestion(email: string): Observable<PasswordHelpQuestion> {
    // return this._http.get<string>(`${this._baseUrl}get-password-help-question/${email}`)
    //   .pipe(map(value => PasswordHelpQuestion.BandName));

    return of(PasswordHelpQuestion.FriendName);
  }

  public remindPassword(request: RemindPasswordRequestModel): Observable<string> {
    // return this._http.post<AccessTokenApiModel>(`${this._baseUrl}remind-password`, request)
    //   .pipe(map(value => 'H@sło123'));
    return of('H@sło123');
  }
}
