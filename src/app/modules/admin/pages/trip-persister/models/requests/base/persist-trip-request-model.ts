import { FormOfTransport } from '../../../enums/form-of-transport.enum';

export abstract class PersistTripRequestModel {
  public title: string;
  public description: string;
  public participants: number[];
  public pricePerSingleParticipant: number;
  public roomSizes: number[];
  public pricePerSingleRoom: number;
  public meal: boolean;
  public pricePerSingleDayOfMeals: number;
  public departureLocation: string;
  public tripLocation: string;
  public startDate: Date;
  public endDate: Date;
  public formOfTransport: FormOfTransport;
  public mainImageUrl: string;
  public otherImageUrls: string[];
}
