import { IAppListRowElementConfiguration, AppListRowElementModel } from './app-list-row-element.model';
import { IAppListIconConfiguration, AppListIconModel } from './app-list-icon.model';
import { Observable } from 'rxjs';
import { isDefined } from '../../../../utils/utils';

export interface IAppListConfiguration<TDataSource> {
  dataSource: Observable<TDataSource[]>;
  rowElements: IAppListRowElementConfiguration<TDataSource>[];
  icon?: IAppListIconConfiguration<TDataSource>;
  divideRows?: boolean;
  maxWidth?: boolean;
}

export class AppListModel<TDataSource> {
  public dataSource: Observable<TDataSource[]>;
  public rowElements: AppListRowElementModel<TDataSource>[];
  public icon: AppListIconModel<TDataSource>;
  public divideRows: boolean;
  public maxWidth: boolean;

  constructor(configuration: IAppListConfiguration<TDataSource>) {
    this.dataSource = configuration.dataSource;
    this.rowElements = configuration.rowElements.map(r => new AppListRowElementModel<TDataSource>(r));
    this.icon = isDefined(configuration.icon) ? new AppListIconModel(configuration.icon) : null;
    this.divideRows = isDefined(configuration.divideRows) ? configuration.divideRows : true;
    this.maxWidth = isDefined(configuration.maxWidth) ? configuration.maxWidth : false;
  }
}
