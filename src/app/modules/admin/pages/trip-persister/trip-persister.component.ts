import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserRouting } from '../../../../core/configurations/routing/children/user-routing';
import { AppInputModel } from '../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppButtonModel } from '../../../../shared/components/wrappers/app-button/models/app-button.model';
import { AppInputBasicModel } from '../../../../shared/components/wrappers/app-input/models/input-types/app-input-basic.model';
import { AppInputBasicType } from '../../../../shared/components/wrappers/app-input/enums/app-input-basic-type.enum';
import { FormOfTransportFactory } from './factories/form-of-transport-factory';
import { TripPersisterEntity } from './entities/trip-persister-entity';
import { AppInputTextAreaModel } from '../../../../shared/components/wrappers/app-input/models/input-types/app-input-text-area.model';
import { AppInputCheckboxModel } from '../../../../shared/components/wrappers/app-input/models/input-types/app-input-checkbox.model';
import { AppSelectModel } from '../../../../shared/components/wrappers/app-select/models/app-select-model';
import { AppTableModel } from '../../../../shared/components/wrappers/app-table/models/app-table.model';
import { ImagesListModel } from './models/images-list-model';
import { AppTableColumnType } from '../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { AppIcon } from '../../../../shared/enums/app-icon.enum';
import { AppTableComponent } from '../../../../shared/components/wrappers/app-table/app-table.component';
import { isNotEmpty } from '../../../../shared/utils/utils';

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

  public participantsInput: AppSelectModel;
  public pricePerSingleParticipantInput: AppInputModel;

  public roomSizesInput: AppSelectModel;
  public pricePerSingleRoomInput: AppInputModel;

  public mealInput: AppInputModel;
  public pricePerSingleDayOfMealsInput: AppInputModel;

  public departureLocationInput: AppInputModel;
  public tripLocationInput: AppInputModel;

  public formOfTransportInput: AppSelectModel;

  public mainImageUrlInput: AppInputModel;
  public otherImageUrlInput: AppInputModel;
  public addOtherImageUrlButton: AppButtonModel;

  public persistButton: AppButtonModel;
  public errors: string[] = [];

  public tableConfig: AppTableModel<ImagesListModel>;

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

    this.participantsInput = new AppSelectModel({
      label: {
        text: this.entity.participants.translateRoute
      },
      attribute: this.entity.participants,
      maxWidth: true
    });

    this.pricePerSingleParticipantInput = new AppInputModel({
      label: {
        text: this.entity.pricePerSingleParticipant.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.price,
        attribute: this.entity.pricePerSingleParticipant,
      }),
    });

    this.roomSizesInput = new AppSelectModel({
      label: {
        text: this.entity.roomSizes.translateRoute
      },
      attribute: this.entity.roomSizes,
      maxWidth: true
    });

    this.pricePerSingleRoomInput = new AppInputModel({
      label: {
        text: this.entity.pricePerSingleRoom.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.price,
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

    this.formOfTransportInput = new AppSelectModel({
      label: {
        text: this.entity.formOfTransport.translateRoute
      },
      attribute: this.entity.formOfTransport,
      maxWidth: true
    });

    this.mainImageUrlInput = new AppInputModel({
      label: {
        text: this.entity.mainImageUrl.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: this.entity.mainImageUrl,
      }),
    });

    this.otherImageUrlInput = new AppInputModel({
      label: {
        text: this.entity.otherImageUrl.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: this.entity.otherImageUrl,
      }),
    });

    this.addOtherImageUrlButton = new AppButtonModel({
      onClick: () => this.entity.addOtherImage(),
      label: {
        text: this.translateRoute + 'ADD_IMAGE',
      },
    });

    this.tableConfig = new AppTableModel<ImagesListModel>({
      translateRout: this.translateRoute + 'COLUMNS',
      headerSticky: true,
      dataSource: this.entity.otherImagesSubject,
      showSpinnerOnInit: false,
      columns: [
        {
          field: 'url',
          type: AppTableColumnType.Text,
          imgPatch: data => data.url
        },
      ],
      columnsWithIcon: [
        {
          icon: AppIcon.Delete,
          onClick: data => this.entity.removeOtherImage(data.url)
        }
      ]
    });
    this.persistButton = new AppButtonModel({
      onClick: () => this.onSave(),
      label: {
        text: this.translateRoute + 'CREATE_TRIP',
      },
    });
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
