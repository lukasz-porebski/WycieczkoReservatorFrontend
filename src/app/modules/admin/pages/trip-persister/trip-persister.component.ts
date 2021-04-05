import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserRouting } from '../../../../core/configurations/routing/children/user-routing';
import { AppInputModel } from '../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppButtonModel } from '../../../../shared/components/wrappers/app-button/models/app-button.model';
import { FormOfTransportFactory } from './factories/form-of-transport-factory';
import { TripPersisterEntity } from './entities/trip-persister-entity';
import { AppSelectModel } from '../../../../shared/components/wrappers/app-select/models/app-select-model';
import { AppTableModel } from '../../../../shared/components/wrappers/app-table/models/app-table.model';
import { ImagesListModel } from './models/images-list-model';
import { AppTableColumnType } from '../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { AppIcon } from '../../../../shared/enums/app-icon.enum';
import { AppTableComponent } from '../../../../shared/components/wrappers/app-table/app-table.component';
import { isNotEmpty } from '../../../../shared/utils/utils';
import { TripPersisterInputFactory } from './factories/trip-persister-input-factory';
import { TripPersisterSelectFactory } from './factories/trip-persister-select-factory';
import { TripPersisterButtonFactory } from './factories/trip-persister-button-factory';
import { TripPersisterMode } from './enums/trip-persister-mode.enum';
import { TripPersisterTableFactory } from './factories/trip-persister-table-factory';

@Component({
  selector: 'app-trip-persister',
  templateUrl: './trip-persister.component.html',
  styleUrls: [ './trip-persister.component.scss' ]
})
export class TripPersisterComponent implements OnInit, OnDestroy {
  @ViewChild(AppTableComponent) imagesTable: AppTableComponent;

  public get showSpinner(): boolean {
    return this.entity.whole.disabled;
  }

  public get disablePersistButton(): boolean {
    return this.entity.whole.invalid || this.entity.whole.disabled;
  }

  public get showMainImage(): boolean {
    return this.entity.mainImageUrl.formControl.valid && isNotEmpty(this.entity.mainImageUrl.value);
  }

  public readonly entity = new TripPersisterEntity(this._formOfTransportFactory);
  public readonly translateRoute = 'MODULES.ADMIN.PAGES.TRIP_PERSISTER.';
  public readonly userRouting = UserRouting;

  public titleInput: AppInputModel;
  public descriptionInput: AppInputModel;

  public participantsSelect: AppSelectModel;
  public pricePerSingleParticipantInput: AppInputModel;

  public roomSizesSelect: AppSelectModel;
  public pricePerSingleRoomInput: AppInputModel;

  public mealInput: AppInputModel;
  public pricePerSingleDayOfMealsInput: AppInputModel;

  public departureLocationInput: AppInputModel;
  public tripLocationInput: AppInputModel;

  public formOfTransportSelect: AppSelectModel;

  public mainImageUrlInput: AppInputModel;
  public otherImageUrlInput: AppInputModel;
  public addOtherImageUrlButton: AppButtonModel;

  public persistButton: AppButtonModel;
  public errors: string[] = [];

  public otherImagesTableConfig: AppTableModel<ImagesListModel>;

  constructor(private readonly _formOfTransportFactory: FormOfTransportFactory,
              private readonly _inputFactory: TripPersisterInputFactory,
              private readonly _selectFactory: TripPersisterSelectFactory,
              private readonly _buttonFactory: TripPersisterButtonFactory,
              private readonly _tableFactory: TripPersisterTableFactory) {
  }

  public ngOnInit(): void {
    this.titleInput = this._inputFactory.createTitle(this.entity);
    this.descriptionInput = this._inputFactory.createDescription(this.entity);

    this.participantsSelect = this._selectFactory.createParticipants(this.entity);
    this.pricePerSingleParticipantInput = this._inputFactory.createPricePerSingleParticipant(this.entity);

    this.roomSizesSelect = this._selectFactory.createRoomSizes(this.entity);
    this.pricePerSingleRoomInput = this._inputFactory.createPricePerSingleRoom(this.entity);

    this.mealInput = this._inputFactory.createMeal(this.entity);
    this.pricePerSingleDayOfMealsInput = this._inputFactory.createPricePerSingleDayOfMeals(this.entity);

    this.departureLocationInput = this._inputFactory.createDepartureLocation(this.entity);
    this.tripLocationInput = this._inputFactory.createTripLocation(this.entity);

    this.formOfTransportSelect = this._selectFactory.createFormOfTransport(this.entity);

    this.mainImageUrlInput = this._inputFactory.createMainImageUrl(this.entity);
    this.otherImageUrlInput = this._inputFactory.createOtherImageUrl(this.entity);

    this.addOtherImageUrlButton = this._buttonFactory.createAddOtherImage(this.entity, this.translateRoute);

    this.otherImagesTableConfig = this._tableFactory.createOtherImages(this.entity, this.translateRoute);

    this.persistButton = this._buttonFactory.createPersist(
      this.entity, this.translateRoute, this.onSave, TripPersisterMode.Creator);
  }

  public ngOnDestroy(): void {
    this.entity.dispose();
  }

  public onSave(): void {
    this.entity.whole.disable();

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
