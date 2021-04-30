import { Injectable } from '@angular/core';
import { AdminServiceModule } from '../../../admin-service.module';
import { TripPersisterEntity } from '../entities/trip-persister-entity';
import { FormOfTransportFactory } from '../../../../_domain-common/factories/form-of-transport-factory';
import { TripApiModel } from '../models/api/trip-api-model';

@Injectable({
  providedIn: AdminServiceModule
})
export class TripPersisterEntityFactory {
  constructor(private readonly _formOfTransportFactory: FormOfTransportFactory) {
  }

  public createEmpty(): TripPersisterEntity {
    return new TripPersisterEntity(this._formOfTransportFactory);
  }

  public createByApiModel(trip: TripApiModel): TripPersisterEntity {
    return new TripPersisterEntity(this._formOfTransportFactory, trip);
  }
}
