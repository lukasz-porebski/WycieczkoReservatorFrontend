import { AppIcon } from '../../../../enums/app-icon.enum';
import { AppListIconSide } from '../enums/app-list-icon-side.enum';
import { isDefined } from '../../../../utils/utils';

export interface IAppListIconConfiguration<TDataSource> {
  name: AppIcon;
  side?: AppListIconSide;
  onClick?: (data: TDataSource) => void;
}

export class AppListIconModel<TDataSource> {
  public name: AppIcon;
  public side: AppListIconSide;
  public onClick: (data: TDataSource) => void;

  constructor(configuration: IAppListIconConfiguration<TDataSource>) {
    this.name = configuration.name;
    this.side = isDefined(configuration.side) ? configuration.side : AppListIconSide.Bottom;
    this.onClick = isDefined(configuration.onClick) ? configuration.onClick : null;
  }
}
