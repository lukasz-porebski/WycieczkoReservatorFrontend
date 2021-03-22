import { HomeRouting } from './home/home-routing';
import { LoginRouting } from './login/login-routing';

export abstract class AppRouting {
  public static readonly login = LoginRouting;
  public static readonly home = HomeRouting;
}
