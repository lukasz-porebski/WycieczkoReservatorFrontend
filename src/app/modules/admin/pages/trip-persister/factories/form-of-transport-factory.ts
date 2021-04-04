import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdminServiceModule } from '../../../admin-service.module';
import { FormOfTransportModel } from '../models/form-of-transport-model';
import { FormOfTransport } from '../enums/form-of-transport.enum';

@Injectable({
  providedIn: AdminServiceModule
})
export class FormOfTransportFactory {
  constructor(private readonly _translateService: TranslateService) {
  }

  public createFormOfTransports(): ReadonlyArray<FormOfTransportModel> {
    const translateRoute = 'MODULES.ADMIN.ENUMS.FORM_OF_TRANSPORT.';
    const questions: FormOfTransportModel[] = [];

    questions.push(new FormOfTransportModel(
      FormOfTransport.Bus, this._translateService.instant(translateRoute + 'BUS')));

    questions.push(new FormOfTransportModel(
      FormOfTransport.Plane, this._translateService.instant(translateRoute + 'PLANE')));

    return questions;
  }
}
