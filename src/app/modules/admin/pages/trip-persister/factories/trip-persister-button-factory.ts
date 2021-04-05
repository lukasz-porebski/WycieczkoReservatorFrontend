import { Injectable } from '@angular/core';
import { AdminServiceModule } from '../../../admin-service.module';
import { TripPersisterEntity } from '../entities/trip-persister-entity';
import { AppButtonModel } from '../../../../../shared/components/wrappers/app-button/models/app-button.model';
import { TripPersisterMode } from '../enums/trip-persister-mode.enum';

@Injectable({
  providedIn: AdminServiceModule
})
export class TripPersisterButtonFactory {
  public createAddOtherImage(entity: TripPersisterEntity, translateRoute: string): AppButtonModel {
    return new AppButtonModel({
      onClick: () => entity.addOtherImage(),
      label: {
        text: translateRoute + 'ADD_IMAGE',
      },
    });
  }

  public createPersist(entity: TripPersisterEntity,
                       translateRoute: string,
                       onPersist: () => void,
                       mode: TripPersisterMode): AppButtonModel {
    return new AppButtonModel({
      onClick: onPersist,
      label: {
        text: translateRoute + (mode === TripPersisterMode.Creator ? 'CREATE_TRIP' : ''),
      },
    });
  }
}
