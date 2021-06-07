import { AppRoutes } from '../app-routes';
import { RoutingPathModel } from '../routing-path.model';

export abstract class TripRouting {
  public static readonly root = AppRoutes.trip.path;

  public static readonly tripsList = new RoutingPathModel(AppRoutes.trip.children.tripsList, TripRouting.root);
  public static readonly tripView = new RoutingPathModel(AppRoutes.trip.children.tripView, TripRouting.root);
  public static readonly myTrips = new RoutingPathModel(AppRoutes.trip.children.myTrips, TripRouting.root);
  public static readonly bookingDetails = new RoutingPathModel(AppRoutes.trip.children.bookingDetails, TripRouting.root);
  
}
