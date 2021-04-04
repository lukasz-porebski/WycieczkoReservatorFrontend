import { IEntity } from '../../../../../shared/interfaces/entity.interface';
import { FormGroup } from '@angular/forms';
import { TextAttribute } from '../../../../../shared/attributes/text-attribute';
import { FormOfTransport } from '../enums/form-of-transport.enum';
import { UrlAttribute } from './attributes/url-attribute';
import { DateAttribute } from '../../../../../shared/attributes/date-attribute';
import { CheckboxAttribute } from '../../../../../shared/attributes/checkbox-attribute';
import { NumberAttribute } from '../../../../../shared/attributes/number-attribute';
import { MultipleSelectAttribute } from '../../../../../shared/attributes/multiple-select-attribute';

export class TripPersisterEntity implements IEntity {
  public readonly title: TextAttribute;
  public readonly description: TextAttribute;

  public readonly participants: MultipleSelectAttribute<number>;
  public readonly pricePerSingleParticipant: NumberAttribute;

  public readonly roomSizes: MultipleSelectAttribute<number>;
  public readonly pricePerSingleRoom: NumberAttribute;

  public readonly meal: CheckboxAttribute;
  public readonly pricePerSingleDayOfMeals: NumberAttribute;

  public readonly departureLocation: TextAttribute;
  public readonly tripLocation: TextAttribute;

  public readonly startDate: DateAttribute;
  public readonly endDate: DateAttribute;

  public readonly mainImageUrl: UrlAttribute;
  public readonly imageUrls: string[];

  public readonly whole: FormGroup;

  public formOfTransport: FormOfTransport;

  constructor(defaultFormOfTransport: FormOfTransport) {
    const translateRoute = 'MODULES.ADMIN.PAGES.TRIP_PERSISTER.ATTRIBUTES.';

    const oneToTenNumbers = this._getOneToTenNumbers();

    this.title = new TextAttribute(translateRoute + 'TITLE.', true);
    this.description = new TextAttribute(translateRoute + 'DESCRIPTION.', true);

    this.participants = new MultipleSelectAttribute<number>({
      translateRoute: translateRoute + 'PARTICIPANS.',
      allValues: oneToTenNumbers
    });
    this.pricePerSingleParticipant = new NumberAttribute({
      translateRoute: translateRoute + 'PRICE_PER_SINGLE_PARTICIPANT.'
    });

    this.roomSizes = new MultipleSelectAttribute<number>({
      translateRoute: translateRoute + 'ROOM_SIZES.',
      allValues: oneToTenNumbers
    });
    this.pricePerSingleRoom = new NumberAttribute({
      translateRoute: translateRoute + 'PRICE_PER_SINGLE_ROOM.'
    });

    this.meal = new CheckboxAttribute({
      translateRoute: translateRoute + 'MEAL.'
    });
    this.pricePerSingleDayOfMeals = new NumberAttribute({
      translateRoute: translateRoute + 'PRICE_PER_SINGLE_DAY_OF_MEALS.'
    });

    this.departureLocation = new TextAttribute(translateRoute + 'DEPERTURE_LOCATION.', true);
    this.tripLocation = new TextAttribute(translateRoute + 'TRIP_LOCATION.', true);

    this.startDate = new DateAttribute({
      min: new Date().addDays(14)
    });
    this.endDate = new DateAttribute();

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
    });

    this.formOfTransport = defaultFormOfTransport;
  }

  public dispose(): void {
    // this.repeatedPassword.dispose();
  }

  private _getOneToTenNumbers(): number[] {
    return Array.from({ length: 10 }, (_, i) => i + 1);
  }
}
