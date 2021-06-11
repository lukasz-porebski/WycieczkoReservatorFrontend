import { AppRoutes } from '../app-routes';
import { RoutingPathModel } from '../routing-path.model';

export abstract class UserRouting {
  public static readonly root = AppRoutes.user.path;

  public static readonly logIn = new RoutingPathModel(AppRoutes.user.children.logIn, UserRouting.root);
  public static readonly registration = new RoutingPathModel(AppRoutes.user.children.registration, UserRouting.root);
  public static readonly passwordReminder = new RoutingPathModel(AppRoutes.user.children.passwordReminder, UserRouting.root);
  public static readonly passwordChanger = new RoutingPathModel(AppRoutes.user.children.passwordChanger, UserRouting.root);

}
