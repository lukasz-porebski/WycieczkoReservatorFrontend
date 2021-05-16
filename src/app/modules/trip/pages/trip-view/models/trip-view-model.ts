
export class TripViewModel {
    public tripId: number;
    public title: string;
    public description: string;
    public pricePerSingleParticipant: number;
    public participants: number[];
    public meal: boolean;
    public departureLocation: string;
    public tripLocation: string;

    public startDate: Date;
    public endDate: Date;
    public formOfTransport: string;

    public mainImageUrl: string;
    public otherImageUrl: string[];
    public minPrice: number;
  }