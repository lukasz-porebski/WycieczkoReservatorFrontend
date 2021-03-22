import { IAppTableColumnActionConfiguration, AppTableColumnActionModel } from './app-table-column-action.model';
import { isDefined } from '../../../../utils/utils';

export interface IAppTableColumnActionsConfiguration<TDataSource> {
  name?: string;
  actions: IAppTableColumnActionConfiguration<TDataSource>[];
  stickyEnd?: boolean;
}

export class AppTableColumnActionsModel<TDataSource> {
  public name?: string;
  public actions: AppTableColumnActionModel<TDataSource>[];
  public stickyEnd = true;

  constructor(configuration: IAppTableColumnActionsConfiguration<TDataSource>) {
    this.name = isDefined(configuration.name) ? configuration.name : 'appTableActions';
    this.actions = configuration.actions.map(a => new AppTableColumnActionModel(a));
    this.stickyEnd = configuration.stickyEnd;
  }
}
