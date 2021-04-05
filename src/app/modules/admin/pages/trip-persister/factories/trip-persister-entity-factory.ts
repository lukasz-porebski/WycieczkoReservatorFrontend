import { Injectable } from '@angular/core';
import { AdminServiceModule } from '../../../admin-service.module';
import { TripPersisterEntity } from '../entities/trip-persister-entity';
import { AppTableModel } from '../../../../../shared/components/wrappers/app-table/models/app-table.model';
import { ImagesListModel } from '../models/images-list-model';
import { AppTableColumnType } from '../../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { AppIcon } from '../../../../../shared/enums/app-icon.enum';
import { FormOfTransportFactory } from './form-of-transport-factory';
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
