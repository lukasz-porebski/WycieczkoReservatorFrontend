import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdminServiceModule } from '../../admin/admin-service.module';
import { FormOfTransport } from '../enums/form-of-transport.enum';
import { ValueTextPairModel } from '../../../shared/models/value-text-pair-model';

@Injectable({
  providedIn: AdminServiceModule
})
export class FormOfTransportFactory {
  constructor(private readonly _translateService: TranslateService) {
  }

  public createFormOfTransports(): ReadonlyArray<ValueTextPairModel<FormOfTransport>> {
    const translateRoute = 'MODULES.ADMIN.ENUMS.FORM_OF_TRANSPORT.';
    const questions: ValueTextPairModel<FormOfTransport>[] = [];

    questions.push(new ValueTextPairModel<FormOfTransport>(
      FormOfTransport.Bus, this._translateService.instant(translateRoute + 'BUS')));

    questions.push(new ValueTextPairModel<FormOfTransport>(
      FormOfTransport.Plane, this._translateService.instant(translateRoute + 'PLANE')));

    return questions;
  }
}
