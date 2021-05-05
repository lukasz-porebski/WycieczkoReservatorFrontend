import { Injectable } from '@angular/core';
import { AdminServiceModule } from '../../../admin-service.module';
import { AppInputModel } from '../../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppInputBasicModel } from '../../../../../shared/components/wrappers/app-input/models/input-types/app-input-basic.model';
import { AppInputBasicType } from '../../../../../shared/components/wrappers/app-input/enums/app-input-basic-type.enum';
import { TripPersisterEntity } from '../entities/trip-persister-entity';
import { AppInputTextAreaModel } from '../../../../../shared/components/wrappers/app-input/models/input-types/app-input-text-area.model';
import { AppInputCheckboxModel } from '../../../../../shared/components/wrappers/app-input/models/input-types/app-input-checkbox.model';

@Injectable({
  providedIn: AdminServiceModule
})
export class TripPersisterInputFactory {
  public createTitle(entity: TripPersisterEntity): AppInputModel {
    return new AppInputModel({
      label: {
        text: entity.title.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: entity.title,
      }),
    });
  }

  public createDescription(entity: TripPersisterEntity): AppInputModel {
    return new AppInputModel({
      label: {
        text: entity.description.translateRoute,
      },
      input: new AppInputTextAreaModel({
        attribute: entity.description,
      }),
    });
  }

  public createPricePerSingleParticipant(entity: TripPersisterEntity): AppInputModel {
    return new AppInputModel({
      label: {
        text: entity.pricePerSingleParticipant.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.price,
        attribute: entity.pricePerSingleParticipant,
      }),
    });
  }

  public createMeal(entity: TripPersisterEntity): AppInputModel {
    return new AppInputModel({
      label: {
        text: entity.meal.translateRoute,
      },
      input: new AppInputCheckboxModel({
        attribute: entity.meal,
      }),
    });
  }

  public createMealPricePerPerson(entity: TripPersisterEntity): AppInputModel {
    return new AppInputModel({
      label: {
        text: entity.mealPricePerPerson.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.price,
        attribute: entity.mealPricePerPerson,
      }),
    });
  }

  public createDepartureLocation(entity: TripPersisterEntity): AppInputModel {
    return new AppInputModel({
      label: {
        text: entity.departureLocation.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: entity.departureLocation,
      }),
    });
  }

  public createTripLocation(entity: TripPersisterEntity): AppInputModel {
    return new AppInputModel({
      label: {
        text: entity.tripLocation.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: entity.tripLocation,
      }),
    });
  }

  public createMainImageUrl(entity: TripPersisterEntity): AppInputModel {
    return new AppInputModel({
      label: {
        text: entity.mainImageUrl.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: entity.mainImageUrl,
      }),
    });
  }

  public createOtherImageUrl(entity: TripPersisterEntity): AppInputModel {
    return new AppInputModel({
      label: {
        text: entity.otherImageUrl.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: entity.otherImageUrl,
      }),
    });
  }
}
