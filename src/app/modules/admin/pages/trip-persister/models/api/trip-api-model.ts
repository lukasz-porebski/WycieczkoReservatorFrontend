import { FormOfTransport } from '../../../../../_domain-common/enums/form-of-transport.enum';
import { EnumTransformer } from '../../../../../../shared/utils/enum-transformer';

export interface TripApiResponse {
  id: number;
  title: string;
  description: string;
  participants: number[];
  pricePerSingleParticipant: number;
  meal: boolean;
  mealPricePerPerson: number;
  departureLocation: string;
  tripLocation: string;
  startDate: string;
  endDate: string;
  formOfTransport: string;
  guideId: number;
  mainImageUrl: string;
  otherImagesUrl: string[];
}

export class TripApiModel {
  public id: number;
  public title: string;
  public description: string;
  public participants: number[];
  public pricePerSingleParticipant: number;
  public meal: boolean;
  public mealPricePerPerson: number;
  public departureLocation: string;
  public tripLocation: string;
  public startDate: Date;
  public endDate: Date;
  public formOfTransport: FormOfTransport;
  public guideId: number;
  public mainImageUrl: string;
  public otherImagesUrl: string[];

  constructor(response: TripApiResponse) {
    this.id = response.id;
    this.title = response.title;
    this.description = response.description;
    this.participants = [ ...response.participants ];
    this.pricePerSingleParticipant = response.pricePerSingleParticipant;
    this.meal = response.meal;
    this.mealPricePerPerson = response.mealPricePerPerson;
    this.departureLocation = response.departureLocation;
    this.tripLocation = response.tripLocation;
    this.startDate = new Date(response.startDate);
    this.endDate = new Date(response.endDate);
    this.formOfTransport = EnumTransformer.ToFormOfTransport(response.formOfTransport);
    this.guideId = response.guideId;
    this.mainImageUrl = response.mainImageUrl;
    this.otherImagesUrl = [ ...response.otherImagesUrl ];
  }
}
