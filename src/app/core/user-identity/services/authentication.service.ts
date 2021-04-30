import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isDefined, isEmpty } from '../../../shared/utils/utils';
import { AccessTokenApiModel, AccessTokenApiResponse } from '../models/apis/access-token-api.model';
import { TokenModel } from '../models/token.model';
import { AppRouting } from '../../configurations/routing/app-routing';
import { LogInRequestModel } from '../models/requests/log-in-request-model';
import { Router } from '@angular/router';
import { UserRole } from '../enums/user-role.enum';
import { EnumTransformer } from '../../../shared/utils/enum-transformer';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public get isUserLogIn(): boolean {
    return isDefined(this.token) && this.token.isAccessTokenActive;
  }

  public get token(): TokenModel {
    return this._tokenSubject.value;
  }

  public readonly tokenObservable: Observable<TokenModel>;

  private readonly _tokenSubject: BehaviorSubject<TokenModel>;
  private readonly _baseUrl = `${this._http.baseUrl}/`;

  constructor(private readonly _http: HttpService,
              private readonly _router: Router) {
    this._tokenSubject = new BehaviorSubject<TokenModel>(this._getTokenFromLocalStorage());
    this.tokenObservable = this._tokenSubject.asObservable();
  }

  public logIn(email: string, password: string): Observable<TokenModel> {
    const request = new LogInRequestModel(email, password);
    return this._logIn(request)
      .pipe(map(accessTokenModel => {
        const token = new TokenModel(accessTokenModel);
        this._setToken(token);
        return token;
      }));
  }

  public logInAndRedirectToTripsList(email: string, password: string): Observable<void> {
    return this.logIn(email, password).pipe(
      switchMap(() => {
        this._router.navigateByUrl(AppRouting.trip.tripsList.absolutePath);
        return of(null);
      })
    );
  }

  public fakeLogIn(userRole: UserRole): Observable<TokenModel> {
    const accessTokenApiModel = new AccessTokenApiModel({
      token: TokenModel.fakeAccessToken,
      role: EnumTransformer.ToApiRequestUserRole(userRole)
    });

    return of(accessTokenApiModel)
      .pipe(map(accessTokenModel => {
        const token = new TokenModel(accessTokenModel);
        this._setToken(token);
        return token;
      }));
  }

  public logout(): Observable<void> {
    this._clearToken();
    return of(null);
  }

  private _logIn(request: LogInRequestModel): Observable<AccessTokenApiModel> {
    return this._http.post<AccessTokenApiResponse>(`${this._baseUrl}login`, request)
      .pipe(map(value => new AccessTokenApiModel(value)));
  }

  private _setToken(token: TokenModel): void {
    localStorage.setItem(LocalStorageKey.Token, JSON.stringify(token));
    this._tokenSubject.next(token);
  }

  private _clearToken(): void {
    localStorage.removeItem(LocalStorageKey.Token);
    this._tokenSubject.next(null);
  }

  private _getTokenFromLocalStorage(): TokenModel {
    const json = localStorage.getItem(LocalStorageKey.Token);
    if (isEmpty(json)) {
      return null;
    }

    return TokenModel.FromJson(json);
  }
}
