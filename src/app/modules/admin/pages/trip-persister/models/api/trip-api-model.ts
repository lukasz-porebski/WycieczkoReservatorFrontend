import { FormOfTransport } from '../../../../../_domain-common/enums/form-of-transport.enum';

export class TripApiModel {
  public id: number;
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
  public guideId: number;
  public mainImageUrl: string;
  public otherImageUrls: string[];

  constructor(response: TripApiModel) {
    this.id = response.id;
    this.title = response.title;
    this.description = response.description;
    this.participants = [ ...response.participants ];
    this.pricePerSingleParticipant = response.pricePerSingleParticipant;
    this.roomSizes = [ ...response.roomSizes ];
    this.pricePerSingleRoom = response.pricePerSingleRoom;
    this.meal = response.meal;
    this.pricePerSingleDayOfMeals = response.pricePerSingleDayOfMeals;
    this.departureLocation = response.departureLocation;
    this.tripLocation = response.tripLocation;
    this.startDate = new Date(response.startDate);
    this.endDate = new Date(response.endDate);
    this.formOfTransport = response.formOfTransport;
    this.guideId = response.guideId;
    this.mainImageUrl = response.mainImageUrl;
    this.otherImageUrls = [ ...response.otherImageUrls ];
  }
}
