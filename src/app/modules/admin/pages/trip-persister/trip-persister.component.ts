import { Component, OnInit } from '@angular/core';
import { UserRouting } from '../../../../core/configurations/routing/children/user-routing';
import { AppInputModel } from '../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppButtonModel } from '../../../../shared/components/wrappers/app-button/models/app-button.model';
import { AppInputBasicModel } from '../../../../shared/components/wrappers/app-input/models/input-types/app-input-basic.model';
import { AppInputBasicType } from '../../../../shared/components/wrappers/app-input/enums/app-input-basic-type.enum';
import { FormOfTransportFactory } from './factories/form-of-transport-factory';
import { TripPersisterEntity } from './entities/trip-persister-entity';
import { AppInputTextAreaModel } from '../../../../shared/components/wrappers/app-input/models/input-types/app-input-text-area.model';
import { AppInputCheckboxModel } from '../../../../shared/components/wrappers/app-input/models/input-types/app-input-checkbox.model';

@Component({
  selector: 'app-trip-persister',
  templateUrl: './trip-persister.component.html',
  styleUrls: [ './trip-persister.component.scss' ]
})
export class TripPersisterComponent implements OnInit {
  public readonly formOfTransports = this._formOfTransportFactory.createFormOfTransports();
  public readonly entity = new TripPersisterEntity(this.formOfTransports[0].value);
  public readonly translateRoute = 'MODULES.ADMIN.PAGES.TRIP_PERSISTER.';
  public readonly userRouting = UserRouting;

  public titleInput: AppInputModel;
  public descriptionInput: AppInputModel;

  public pricePerSingleParticipantInput: AppInputModel;

  public pricePerSingleRoomInput: AppInputModel;

  public mealInput: AppInputModel;
  public pricePerSingleDayOfMealsInput: AppInputModel;

  public departureLocationInput: AppInputModel;
  public tripLocationInput: AppInputModel;

  public button: AppButtonModel;
  public errors: string[] = [];
  public showSpinner = false;

  constructor(private readonly _formOfTransportFactory: FormOfTransportFactory) {
  }

  public ngOnInit(): void {
    this.titleInput = new AppInputModel({
      label: {
        text: this.entity.title.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: this.entity.title,
      }),
    });

    this.descriptionInput = new AppInputModel({
      label: {
        text: this.entity.description.translateRoute,
      },
      input: new AppInputTextAreaModel({
        attribute: this.entity.description,
      }),
    });

    this.pricePerSingleParticipantInput = new AppInputModel({
      label: {
        text: this.entity.pricePerSingleParticipant.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.number,
        attribute: this.entity.pricePerSingleParticipant,
      }),
    });

    this.pricePerSingleRoomInput = new AppInputModel({
      label: {
        text: this.entity.pricePerSingleRoom.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.number,
        attribute: this.entity.pricePerSingleRoom,
      }),
    });

    this.mealInput = new AppInputModel({
      label: {
        text: this.entity.meal.translateRoute,
      },
      input: new AppInputCheckboxModel({
        attribute: this.entity.meal,
      }),
    });

    this.pricePerSingleDayOfMealsInput = new AppInputModel({
      label: {
        text: this.entity.pricePerSingleDayOfMeals.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.number,
        attribute: this.entity.pricePerSingleDayOfMeals,
      }),
    });

    this.departureLocationInput = new AppInputModel({
      label: {
        text: this.entity.departureLocation.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: this.entity.departureLocation,
      }),
    });

    this.tripLocationInput = new AppInputModel({
      label: {
        text: this.entity.tripLocation.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: this.entity.tripLocation,
      }),
    });

    this.button = new AppButtonModel({
      onClick: () => this.onSave(),
      label: {
        text: this.translateRoute + 'CREATE_TRIP',
      },
    });
  }

  public onSave(): void {
    this.entity.whole.disable();
    this.showSpinner = true;

    // this._userApiService.register()
    //   .pipe(
    //     switchMap(() => this._authenticationService.login(
    //       this.service.userEntity.email.value, this.service.userEntity.password.value)),
    //     catchError((error: string[]) => {
    //       this.errors = replaceIfNotDefined(error, [])
    //         .map(e => ErrorTranslator.getErrorTranslateRoute(e));
    //       this.service.userEntity.whole.enable();
    //       this.showSpinner = false;
    //       return of(null);
    //     }),
    //   )
    //   .subscribe(() => this.goToNextStep.emit());
  }
}
