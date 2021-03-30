import { AppRoutes } from '../app-routes';
import { RoutingPathModel } from '../routing-path.model';

export abstract class AdminRouting {
  public static readonly root = AppRoutes.admin.path;

  public static readonly usersList = new RoutingPathModel(AppRoutes.admin.children.usersList, AdminRouting.root);
}
