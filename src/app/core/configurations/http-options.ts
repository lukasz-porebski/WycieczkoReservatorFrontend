import { HttpHeaders, HttpParams } from '@angular/common/http';

export class HttpOptions {
  public headers?: HttpHeaders;
  public observe?: 'body';
  public responseType?: 'json';
  public withCredensials?: boolean;
  public params?: HttpParams;

  constructor() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.params = new HttpParams();
  }
}
