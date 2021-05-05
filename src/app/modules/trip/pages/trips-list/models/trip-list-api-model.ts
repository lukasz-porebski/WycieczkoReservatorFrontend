export class TripListApiModel {
  public id: number;
  public title: string;
  public mainImageUrl: string;
  public minPrice: number;
  public guideId: number;

  public constructor(response: TripListApiModel) {
    this.id = response.id;
    this.title = response.title;
    this.mainImageUrl = response.mainImageUrl;
    this.minPrice = response.minPrice;
    this.guideId = response.guideId;
  }
}
