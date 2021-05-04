export abstract class PersistTripRequestModel {
  public title: string;
  public description: string;
  public participants: number[];
  public pricePerSingleParticipant: number;
  public meal: boolean;
  public pricePerSingleDayOfMeals: number;
  public departureLocation: string;
  public tripLocation: string;
  public startDate: Date;
  public endDate: Date;
  public formOfTransport: string;
  public guideId: number;
  public mainImageUrl: string;
  public otherImagesUrl: string[];
}
