import { AppIcon } from '../../../../enums/app-icon.enum';

export interface IAppTableColumnWithIcon<TDataSource> {
  icon: AppIcon;
  onClick: (data: TDataSource) => void;
}

export class AppTableColumnWithIconModel<TDataSource> {
  public icon: AppIcon;
  public onClick: (data: TDataSource) => void;
  public columnName: string;

  constructor(configuration: IAppTableColumnWithIcon<TDataSource>) {
    this.icon = configuration.icon;
    this.onClick = configuration.onClick;
    this.columnName = `app-table-column-with-icon-${this.icon}`;
  }
}
