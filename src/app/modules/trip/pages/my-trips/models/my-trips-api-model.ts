export class MyTripsApiModel {
    public guideId: number;
    public mainImageUrl: string;
    public minPrice: number;
    public reservationId: number;
    public title: string;
  
    public constructor(response: MyTripsApiModel) {
      this.guideId = response.guideId;
      this.title = response.title;
      this.mainImageUrl = response.mainImageUrl;
      this.minPrice = response.minPrice;
      this.guideId = response.guideId;
    }
  }