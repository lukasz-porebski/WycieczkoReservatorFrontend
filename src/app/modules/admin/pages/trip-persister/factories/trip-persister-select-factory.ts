import { Injectable } from '@angular/core';
import { AdminServiceModule } from '../../../admin-service.module';
import { TripPersisterEntity } from '../entities/trip-persister-entity';
import { AppSelectModel } from '../../../../../shared/components/wrappers/app-select/models/app-select-model';

@Injectable({
  providedIn: AdminServiceModule
})
export class TripPersisterSelectFactory {
  public createParticipants(entity: TripPersisterEntity): AppSelectModel {
    return new AppSelectModel({
      label: {
        text: entity.participants.translateRoute
      },
      attribute: entity.participants,
      maxWidth: true
    });
  }

  public createRoomSizes(entity: TripPersisterEntity): AppSelectModel {
    return new AppSelectModel({
      label: {
        text: entity.roomSizes.translateRoute
      },
      attribute: entity.roomSizes,
      maxWidth: true
    });
  }

  public createFormOfTransport(entity: TripPersisterEntity): AppSelectModel {
    return new AppSelectModel({
      label: {
        text: entity.formOfTransport.translateRoute
      },
      attribute: entity.formOfTransport,
      maxWidth: true
    });
  }
}
