import { IEntity } from '../../../../../shared/interfaces/entity.interface';
import { FormGroup } from '@angular/forms';
import { TextAttribute } from '../../../../../shared/attributes/text-attribute';
import { FormOfTransport } from '../enums/form-of-transport.enum';
import { UrlAttribute } from './attributes/url/url-attribute';
import { DateAttribute } from '../../../../../shared/attributes/date-attribute';
import { CheckboxAttribute } from '../../../../../shared/attributes/checkbox-attribute';
import { NumberAttribute } from '../../../../../shared/attributes/number-attribute';
import { MultipleSelectAttribute } from '../../../../../shared/attributes/select/multiple-select-attribute';
import { SingleSelectAttribute } from '../../../../../shared/attributes/select/single-select-attribute';
import { FormOfTransportFactory } from '../factories/form-of-transport-factory';
import { FormOfTransportModel } from '../models/form-of-transport-model';
import { PricePerSingleDayOfMealsAttribute } from './attributes/price-per-single-day-of-meals/price-per-single-day-of-meals-attribute';
import { IDisposable } from '../../../../../shared/interfaces/disposable.interface';

export class TripPersisterEntity implements IEntity, IDisposable {
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

  public readonly formOfTransport: SingleSelectAttribute<FormOfTransportModel, FormOfTransport>;

  public readonly mainImageUrl: UrlAttribute;
  public readonly imageUrls: string[];

  public readonly whole: FormGroup;

  constructor(formOfTransportFactory: FormOfTransportFactory) {
    const translateRoute = 'MODULES.ADMIN.PAGES.TRIP_PERSISTER.ATTRIBUTES.';

    const oneToTenNumbers = this._getOneToTenNumbers();

    this.title = new TextAttribute({
      translateRoute: translateRoute + 'TITLE.',
      isRequired: true
    });
    this.description = new TextAttribute({
      translateRoute: translateRoute + 'DESCRIPTION.',
      isRequired: true
    });

    this.participants = new MultipleSelectAttribute<number>({
      translateRoute: translateRoute + 'PARTICIPANS.',
      dataSource: oneToTenNumbers,
      required: true
    });
    this.pricePerSingleParticipant = new NumberAttribute({
      translateRoute: translateRoute + 'PRICE_PER_SINGLE_PARTICIPANT.',
      min: 1
    });

    this.roomSizes = new MultipleSelectAttribute<number>({
      translateRoute: translateRoute + 'ROOM_SIZES.',
      dataSource: oneToTenNumbers,
      required: true
    });
    this.pricePerSingleRoom = new NumberAttribute({
      translateRoute: translateRoute + 'PRICE_PER_SINGLE_ROOM.',
      min: 1
    });

    this.meal = new CheckboxAttribute({
      translateRoute: translateRoute + 'MEAL.',
    });
    this.pricePerSingleDayOfMeals = new PricePerSingleDayOfMealsAttribute(this.meal);

    this.departureLocation = new TextAttribute({
      translateRoute: translateRoute + 'DEPERTURE_LOCATION.',
      isRequired: true
    });
    this.tripLocation = new TextAttribute({
      translateRoute: translateRoute + 'TRIP_LOCATION.',
      isRequired: true
    });

    this.startDate = new DateAttribute({
      min: new Date().addDays(14),
      isRequired: true
    });
    this.endDate = new DateAttribute({
      isRequired: true
    });

    const formOfTransports = formOfTransportFactory.createFormOfTransports();
    this.formOfTransport = new SingleSelectAttribute<FormOfTransportModel, FormOfTransport>({
      translateRoute: translateRoute + 'FORM_OF_TRANSPORT.',
      dataSource: formOfTransports,
      defaultValue: formOfTransports[0].value,
      valueSelector: data => data.value,
      optionTextSelector: data => data.text,
      required: true
    });

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
      formOfTransport: this.formOfTransport.formControl
    });
  }

  public dispose(): void {
    this.pricePerSingleDayOfMeals.dispose();
  }

  private _getOneToTenNumbers(): number[] {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  }
}