import { HomeRouting } from './home/home-routing';
import { AccountRouting } from './account/account-routing';

export abstract class AppRouting {
  public static readonly account = AccountRouting;
  public static readonly home = HomeRouting;
}
