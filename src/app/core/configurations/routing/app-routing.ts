import { HomeRouting } from './children/home-routing';
import { UserRouting } from './children/user-routing';

export abstract class AppRouting {
  public static readonly user = UserRouting;
  public static readonly home = HomeRouting;
}
