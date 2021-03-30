import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { isDefined, isEmpty } from '../../../shared/utils/utils';
import { HttpOptions } from '../../configurations/http-options';
import { environment } from '../../../../environments/environment';
import { AccessTokenApiModel } from '../models/apis/access-token-api.model';
import { TokenModel } from '../models/token.model';
import { AppRouting } from '../../configurations/routing/app-routing';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public get isUserLogIn(): boolean {
    return isDefined(this.currentTokenValue) && this.currentTokenValue.isAccessTokenActive;
  }

  public get currentTokenValue(): TokenModel {
    return this._currentTokenSubject.value;
  }

  public readonly currentToken: Observable<TokenModel>;

  private readonly _currentTokenSubject: BehaviorSubject<TokenModel>;
  private readonly _baseUrl = `${this._http.baseUrl}/authorization/`;
  private readonly _redirectUrl = `${environment.appUrl}/${AppRouting.user.root}`;

  constructor(private readonly _http: HttpService) {
    this._currentTokenSubject = new BehaviorSubject<TokenModel>(this._getTokenFromLocalStorage());
    this.currentToken = this._currentTokenSubject.asObservable();
  }

  public generateUrlForCode(): Observable<string> {
    const httpOptions = new HttpOptions();
    httpOptions.params = httpOptions.params
      .append('redirectUrl', this._redirectUrl);
    httpOptions.responseType = 'text' as 'json';

    return this._http.get<string>(`${this._baseUrl}generate-url-for-code`, httpOptions);
  }

  public logIn(login: string, password: string): Observable<TokenModel> {
    return this._generateAccessToken(null)
      .pipe(map(res => {
        const token = new TokenModel(res.accessToken, res.expiresIn);
        this._setToken(token);
        return token;
      }));
  }

  public logout(): Observable<void> {
    this._clearToken();
    return of(null);
  }

  private _generateAccessToken(refreshToken: string): Observable<AccessTokenApiModel> {
    const httpOptions = new HttpOptions();
    httpOptions.params = httpOptions.params.append('refreshToken', refreshToken);
    httpOptions.responseType = 'text' as 'json';

    return this._http.post<AccessTokenApiModel>(`${this._baseUrl}generate-access-token`, null, httpOptions)
      .pipe(map(value => new AccessTokenApiModel(value)));
  }

  private _setToken(token: TokenModel): void {
    localStorage.setItem(LocalStorageKey.Token, JSON.stringify(token));
    this._currentTokenSubject.next(token);
  }

  private _clearToken(): void {
    localStorage.removeItem(LocalStorageKey.Token);
    this._currentTokenSubject.next(null);
  }

  private _getTokenFromLocalStorage(): TokenModel {
    const json = localStorage.getItem(LocalStorageKey.Token);
    if (isEmpty(json)) {
      return null;
    }
    return TokenModel.FromJson(json);
  }
}
