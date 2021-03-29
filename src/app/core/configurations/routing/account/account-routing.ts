import { AppRoutes } from '../app-routes';
import { RoutingPathModel } from '../routing-path.model';

export abstract class AccountRouting {
  public static readonly root = AppRoutes.account.path;

  public static readonly logIn = new RoutingPathModel(AppRoutes.account.children.logIn, AccountRouting.root);
  public static readonly registration = new RoutingPathModel(AppRoutes.account.children.registration, AccountRouting.root);
  public static readonly passwordReminder = new RoutingPathModel(AppRoutes.account.children.passwordReminder, AccountRouting.root);
}
