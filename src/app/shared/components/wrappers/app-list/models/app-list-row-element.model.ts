import { isDefined } from '../../../../utils/utils';
import { IAppListRowElementLabelModel, AppListRowElementLabelModel } from './app-list-row-element-label.model';
import { AppListRowElementType } from '../enums/app-list-row-element-type.enum';

export interface IAppListRowElementConfiguration<TDataSource> {
  label: IAppListRowElementLabelModel;
  dataSource: string | ((data: TDataSource) => any);
  type?: AppListRowElementType;
}

export class AppListRowElementModel<TDataSource> {
  public label: AppListRowElementLabelModel;
  public dataSource: string | ((data: TDataSource) => any);
  public type: AppListRowElementType;

  constructor(configuration: IAppListRowElementConfiguration<TDataSource>) {
    this.label = new AppListRowElementLabelModel(configuration.label);
    this.dataSource = configuration.dataSource;
    this.type = isDefined(configuration.type) ? configuration.type : AppListRowElementType.Text;
  }
}
