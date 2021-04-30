import { Injectable } from '@angular/core';
import { AdminServiceModule } from '../../../admin-service.module';
import { TripPersisterEntity } from '../entities/trip-persister-entity';
import { CreateTripRequestModel } from '../models/requests/create-trip-request-model';
import { EditTripRequestModel } from '../models/requests/edit-trip-request-model';
import { PersistTripRequestModel } from '../models/requests/base/persist-trip-request-model';
import { EnumTransformer } from '../../../../../shared/utils/enum-transformer';

@Injectable({
  providedIn: AdminServiceModule
})
export class TripPersisterRequestFactory {
  public createTripCreate(entity: TripPersisterEntity): CreateTripRequestModel {
    const request = new CreateTripRequestModel();
    this._setPersistRequest(entity, request);
    return request;
  }

  public createTripEdit(entity: TripPersisterEntity): EditTripRequestModel {
    const request = new EditTripRequestModel();
    request.id = entity.tripId;
    this._setPersistRequest(entity, request);
    return request;
  }

  private _setPersistRequest(entity: TripPersisterEntity, request: PersistTripRequestModel): void {
    request.title = entity.title.value;
    request.description = entity.description.value;
    request.participants = [ ...entity.participants.value ];
    request.pricePerSingleParticipant = entity.pricePerSingleParticipant.value;
    request.roomSizes = [ ...entity.roomSizes.value ];
    request.pricePerSingleRoom = entity.pricePerSingleRoom.value;
    request.meal = entity.meal.value;
    request.pricePerSingleDayOfMeals = entity.pricePerSingleDayOfMeals.value;
    request.departureLocation = entity.departureLocation.value;
    request.tripLocation = entity.tripLocation.value;
    request.startDate = entity.startDate.value;
    request.endDate = entity.endDate.value;
    request.formOfTransport = EnumTransformer.ToApiRequestFormOfTransport(entity.formOfTransport.value);
    request.guideId = entity.guideId.value;
    request.mainImageUrl = entity.mainImageUrl.value;
    request.otherImagesUrl = entity.otherImages.map(i => i.url);
  }
}
