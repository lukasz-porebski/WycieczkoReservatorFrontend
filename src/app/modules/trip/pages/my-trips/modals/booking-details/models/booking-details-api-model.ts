export class BookingDetailsApiModel {
  
    public tripId: number;
    public title: string;
    public description: string;
    public pricePerSingleParticipant: number;
    public participants: number;
    public meal: boolean;
    public mealPricePerPerson: number;
   
    public tripLocation: string;

    public startDate: Date;
    public endDate: Date;
    public formOfTransport: string;

    public mainImageUrl: string;
    public otherImagesUrl: string[];

    public guideId: number;
    public price: number;

  }