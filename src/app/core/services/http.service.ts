import { Injectable } from '@angular/core';
import { HttpOptions } from '../configurations/http-options';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public readonly baseUrl = environment.apiUrl;

  private readonly _httpOptions: HttpOptions = new HttpOptions();

  constructor(private readonly _http: HttpClient) {
  }

  public get<T>(url: string, httpOptions: HttpOptions = this._httpOptions): Observable<T> {
    return this._http.get<T>(url, httpOptions);
  }

  public post<T>(url: string, request: any, httpOptions: HttpOptions = this._httpOptions): Observable<T> {
    return this._http.post<T>(url, JSON.stringify(request), httpOptions);
  }

  public patch<T>(url: string, request: any, httpOptions: HttpOptions = this._httpOptions): Observable<T> {
    return this._http.patch<T>(url, JSON.stringify(request), httpOptions);
  }

  public put<T>(url: string, request: any, httpOptions: HttpOptions = this._httpOptions): Observable<T> {
    return this._http.put<T>(url, JSON.stringify(request), httpOptions);
  }

  public delete(url: string, httpOptions: HttpOptions = this._httpOptions): Observable<void> {
    return this._http.delete<void>(url, httpOptions);
  }
}
