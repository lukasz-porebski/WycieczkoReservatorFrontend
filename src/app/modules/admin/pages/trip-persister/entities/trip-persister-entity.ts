import { IEntity } from '../../../../../shared/interfaces/entity.interface';
import { FormGroup } from '@angular/forms';
import { TextAttribute } from '../../../../../shared/attributes/text-attribute';
import { FormOfTransport } from '../../../../_domain-common/enums/form-of-transport.enum';
import { UrlAttribute } from './attributes/url/url-attribute';
import { DateAttribute } from '../../../../../shared/attributes/date-attribute';
import { CheckboxAttribute } from '../../../../../shared/attributes/checkbox-attribute';
import { NumberAttribute } from '../../../../../shared/attributes/number-attribute';
import { MultipleSelectAttribute } from '../../../../../shared/attributes/select/multiple-select-attribute';
import { SingleSelectAttribute } from '../../../../../shared/attributes/select/single-select-attribute';
import { FormOfTransportFactory } from '../../../../_domain-common/factories/form-of-transport-factory';
import { PricePerSingleDayOfMealsAttribute } from './attributes/price-per-single-day-of-meals/price-per-single-day-of-meals-attribute';
import { IDisposable } from '../../../../../shared/interfaces/disposable.interface';
import { ImagesListModel } from '../models/images-list-model';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { TripApiModel } from '../models/api/trip-api-model';
import { isDefined } from '../../../../../shared/utils/utils';
import { ValueTextPairModel } from '../../../../../shared/models/value-text-pair-model';

export class TripPersisterEntity implements IEntity, IDisposable {
  public get otherImagesSubject(): Observable<ImagesListModel[]> {
    return this._otherImagesSubject.asObservable();
  }

  public readonly tripId?: number;

  public readonly title: TextAttribute;
  public readonly description: TextAttribute;

  public readonly participants: MultipleSelectAttribute<number>;
  public readonly pricePerSingleParticipant: NumberAttribute;

  public readonly roomSizes: MultipleSelectAttribute<number>;
  public readonly pricePerSingleRoom: NumberAttribute;

  public readonly meal: CheckboxAttribute;
  public readonly pricePerSingleDayOfMeals: PricePerSingleDayOfMealsAttribute;

  public readonly departureLocation: TextAttribute;
  public readonly tripLocation: TextAttribute;

  public readonly startDate: DateAttribute;
  public readonly endDate: DateAttribute;

  public readonly formOfTransport: SingleSelectAttribute<ValueTextPairModel<FormOfTransport>, FormOfTransport>;

  public readonly guideId: NumberAttribute;

  public readonly mainImageUrl: UrlAttribute;
  public readonly otherImageUrl: UrlAttribute;

  public readonly whole: FormGroup;

  public otherImages: ImagesListModel[];

  private readonly _otherImagesSubject: BehaviorSubject<ImagesListModel[]>;

  constructor(formOfTransportFactory: FormOfTransportFactory,
              apiModel?: TripApiModel) {
    const translateRoute = 'MODULES.ADMIN.PAGES.TRIP_PERSISTER.ATTRIBUTES.';
    const oneToTenNumbers = this._getOneToTenNumbers();

    this.tripId = apiModel?.id;

    this.title = new TextAttribute({
      translateRoute: translateRoute + 'TITLE.',
      isRequired: true,
      defaultValue: apiModel?.title
    });
    this.description = new TextAttribute({
      translateRoute: translateRoute + 'DESCRIPTION.',
      isRequired: true,
      defaultValue: apiModel?.description
    });

    this.participants = new MultipleSelectAttribute<number>({
      translateRoute: translateRoute + 'PARTICIPANS.',
      dataSource: oneToTenNumbers,
      required: true,
      defaultValue: apiModel?.participants
    });
    this.pricePerSingleParticipant = new NumberAttribute({
      translateRoute: translateRoute + 'PRICE_PER_SINGLE_PARTICIPANT.',
      min: 1,
      defaultValue: apiModel?.pricePerSingleParticipant ?? 0
    });

    this.roomSizes = new MultipleSelectAttribute<number>({
      translateRoute: translateRoute + 'ROOM_SIZES.',
      dataSource: oneToTenNumbers,
      required: true,
      defaultValue: apiModel?.roomSizes
    });
    this.pricePerSingleRoom = new NumberAttribute({
      translateRoute: translateRoute + 'PRICE_PER_SINGLE_ROOM.',
      min: 1,
      defaultValue: apiModel?.pricePerSingleRoom ?? 0
    });

    this.meal = new CheckboxAttribute({
      translateRoute: translateRoute + 'MEAL.',
      defaultValue: apiModel?.meal
    });
    this.pricePerSingleDayOfMeals = new PricePerSingleDayOfMealsAttribute({
      meal: this.meal,
      defaultValue: apiModel?.pricePerSingleDayOfMeals ?? 0
    });

    this.departureLocation = new TextAttribute({
      translateRoute: translateRoute + 'DEPERTURE_LOCATION.',
      isRequired: true,
      defaultValue: apiModel?.departureLocation
    });
    this.tripLocation = new TextAttribute({
      translateRoute: translateRoute + 'TRIP_LOCATION.',
      isRequired: true,
      defaultValue: apiModel?.tripLocation
    });

    this.startDate = new DateAttribute({
      min: new Date().addDays(14),
      isRequired: true,
      defaultValue: apiModel?.startDate
    });
    this.endDate = new DateAttribute({
      isRequired: true,
      defaultValue: apiModel?.endDate
    });

    const formOfTransports = formOfTransportFactory.createFormOfTransports();
    this.formOfTransport = new SingleSelectAttribute<ValueTextPairModel<FormOfTransport>, FormOfTransport>({
      translateRoute: translateRoute + 'FORM_OF_TRANSPORT.',
      dataSource: formOfTransports,
      defaultValue: isDefined(apiModel) ? apiModel?.formOfTransport : formOfTransports[0].value,
      valueSelector: data => data.value,
      optionTextSelector: data => data.text,
      required: true
    });

    this.guideId = new NumberAttribute({
      defaultValue: apiModel?.guideId,
      required: true,
      translateRoute: ''
    });

    this.mainImageUrl = new UrlAttribute({
      translateRoute: translateRoute + 'MAIN_IMAGE_URL.',
      required: true,
      defaultValue: apiModel?.mainImageUrl
    });

    this.otherImageUrl = new UrlAttribute({
      translateRoute: translateRoute + 'OTHER_IMAGE_URL.',
    });

    this.otherImages = isDefined(apiModel)
      ? apiModel.otherImagesUrl.map(i => new ImagesListModel(i))
      : [];

    this._otherImagesSubject = new BehaviorSubject<ImagesListModel[]>(this.otherImages);

    this.whole = new FormGroup({
      title: this.title.formControl,
      description: this.description.formControl,
      minNumberOfPersons: this.pricePerSingleParticipant.formControl,
      maxNumberOfPersons: this.pricePerSingleRoom.formControl,
      departureLocation: this.departureLocation.formControl,
      tripLocation: this.tripLocation.formControl,
      startDate: this.startDate.formControl,
      endDate: this.endDate.formControl,
      meal: this.meal.formControl,
      formOfTransport: this.formOfTransport.formControl,
      mainImageUrl: this.mainImageUrl.formControl,
      guidId: this.guideId.formControl
    });
  }

  public addOtherImage(): void {
    this.otherImages.push(new ImagesListModel(this.otherImageUrl.value));
    this.otherImageUrl.formControl.reset();
    this._otherImagesSubject.next(this.otherImages);
  }

  public removeOtherImage(url: string): void {
    this.otherImages = this.otherImages.filter(i => i.url !== url);
    this._otherImagesSubject.next(this.otherImages);
  }

  public dispose(): void {
    this.pricePerSingleDayOfMeals.dispose();
    this._otherImagesSubject.complete();
  }

  private _getOneToTenNumbers(): number[] {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  }
}
