import { Injectable } from '@angular/core';
import { AccountApiServiceModule } from '../account-api-service.module';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: AccountApiServiceModule
})
export class AccountService {
  constructor(private readonly _http: HttpService) {
  }
}
