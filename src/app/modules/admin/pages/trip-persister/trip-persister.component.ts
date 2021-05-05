import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserRouting } from '../../../../core/configurations/routing/children/user-routing';
import { AppInputModel } from '../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppButtonModel } from '../../../../shared/components/wrappers/app-button/models/app-button.model';
import { TripPersisterEntity } from './entities/trip-persister-entity';
import { AppSelectModel } from '../../../../shared/components/wrappers/app-select/models/app-select-model';
import { AppTableModel } from '../../../../shared/components/wrappers/app-table/models/app-table.model';
import { ImagesListModel } from './models/images-list-model';
import { AppTableComponent } from '../../../../shared/components/wrappers/app-table/app-table.component';
import { isDefined, isNotEmpty, toNumber } from '../../../../shared/utils/utils';
import { TripPersisterInputFactory } from './factories/trip-persister-input-factory';
import { TripPersisterSelectFactory } from './factories/trip-persister-select-factory';
import { TripPersisterButtonFactory } from './factories/trip-persister-button-factory';
import { TripPersisterMode } from './enums/trip-persister-mode.enum';
import { TripPersisterTableFactory } from './factories/trip-persister-table-factory';
import { ActivatedRoute } from '@angular/router';
import { TripPersisterEntityFactory } from './factories/trip-persister-entity-factory';
import { TripPersisterApiService } from './services/trip-persister-api.service';
import { UserListApiModel } from '../users-list/models/user-list-api-model';

@Component({
  selector: 'app-trip-persister',
  templateUrl: './trip-persister.component.html',
  styleUrls: [ './trip-persister.component.scss' ]
})
export class TripPersisterComponent implements OnInit, OnDestroy {
  @ViewChild(AppTableComponent) imagesTable: AppTableComponent;

  public get showSpinner(): boolean {
    return !this.initialized || this.entity.whole.disabled;
  }

  public get disablePersistButton(): boolean {
    return this.entity.whole.invalid || this.entity.whole.disabled;
  }

  public get showMainImage(): boolean {
    return this.entity.mainImageUrl.formControl.valid && isNotEmpty(this.entity.mainImageUrl.value);
  }

  public get initialized(): boolean {
    return isDefined(this.entity);
  }

  public readonly translateRoute = 'MODULES.ADMIN.PAGES.TRIP_PERSISTER.';
  public readonly userRouting = UserRouting;

  public entity: TripPersisterEntity;

  public titleInput: AppInputModel;
  public descriptionInput: AppInputModel;

  public participantsSelect: AppSelectModel;
  public pricePerSingleParticipantInput: AppInputModel;

  public mealInput: AppInputModel;
  public mealPricePerPersonInput: AppInputModel;

  public departureLocationInput: AppInputModel;
  public tripLocationInput: AppInputModel;

  public formOfTransportSelect: AppSelectModel;

  public guidesTableConfig: AppTableModel<UserListApiModel>;

  public mainImageUrlInput: AppInputModel;
  public otherImageUrlInput: AppInputModel;
  public addOtherImageUrlButton: AppButtonModel;
  public otherImagesTableConfig: AppTableModel<ImagesListModel>;

  public persistButton: AppButtonModel;
  public errors: string[] = [];

  constructor(private readonly _entityFactory: TripPersisterEntityFactory,
              private readonly _inputFactory: TripPersisterInputFactory,
              private readonly _selectFactory: TripPersisterSelectFactory,
              private readonly _buttonFactory: TripPersisterButtonFactory,
              private readonly _tableFactory: TripPersisterTableFactory,
              private readonly _route: ActivatedRoute,
              private readonly _apiService: TripPersisterApiService) {
  }

  public ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');

    if (isDefined(id)) {
      this._apiService.getTrip(toNumber(id))
        .subscribe(value => {
          const entity = this._entityFactory.createByApiModel(value);
          this._initialize(entity, TripPersisterMode.Editor);
        });
    } else {
      const entity = this._entityFactory.createEmpty();
      this._initialize(entity, TripPersisterMode.Creator);
    }
  }

  public ngOnDestroy(): void {
    this.entity.dispose();
  }

  private _initialize(entity: TripPersisterEntity, mode: TripPersisterMode): void {
    this.entity = entity;

    this.titleInput = this._inputFactory.createTitle(entity);
    this.descriptionInput = this._inputFactory.createDescription(entity);

    this.participantsSelect = this._selectFactory.createParticipants(entity);
    this.pricePerSingleParticipantInput = this._inputFactory.createPricePerSingleParticipant(entity);

    this.mealInput = this._inputFactory.createMeal(entity);
    this.mealPricePerPersonInput = this._inputFactory.createMealPricePerPerson(entity);

    this.departureLocationInput = this._inputFactory.createDepartureLocation(entity);
    this.tripLocationInput = this._inputFactory.createTripLocation(entity);

    this.formOfTransportSelect = this._selectFactory.createFormOfTransport(entity);

    this.guidesTableConfig = this._tableFactory.createGuides(entity, this.translateRoute);

    this.mainImageUrlInput = this._inputFactory.createMainImageUrl(entity);
    this.otherImageUrlInput = this._inputFactory.createOtherImageUrl(entity);

    this.addOtherImageUrlButton = this._buttonFactory.createAddOtherImage(entity, this.translateRoute);

    this.otherImagesTableConfig = this._tableFactory.createOtherImages(entity, this.translateRoute);

    this.persistButton = this._buttonFactory.createPersist(entity, this.translateRoute, mode);
  }
}
