import { HomeRouting } from './children/home-routing';
import { UserRouting } from './children/user-routing';
import { AdminRouting } from './children/admin-routing';
import { TripRouting } from './children/trip-routing';

export abstract class AppRouting {
  public static readonly user = UserRouting;
  public static readonly home = HomeRouting;
  public static readonly admin = AdminRouting;
  public static readonly trip = TripRouting;
}
