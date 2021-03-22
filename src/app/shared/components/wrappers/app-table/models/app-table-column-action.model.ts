import { AppIcon } from '../../../../enums/app-icon.enum';
import { isDefined } from '../../../../utils/utils';

export interface IAppTableColumnActionConfiguration<TDataSource> {
  icon?: AppIcon;
  name?: string;
  disabled?: boolean | ((rowValue: Readonly<TDataSource>) => boolean);
  hide?: boolean | ((rowValue: Readonly<TDataSource>) => boolean);
  onClick?: (rowValue: Readonly<TDataSource>) => void;
}

export class AppTableColumnActionModel<TDataSource> {
  public icon?: AppIcon;
  public name?: string;
  public disabled?: ((rowValue: Readonly<TDataSource>) => boolean);
  public hide?: boolean | ((rowValue: Readonly<TDataSource>) => boolean);
  public onClick?: (rowValue: Readonly<TDataSource>) => void;

  constructor(configuration: IAppTableColumnActionConfiguration<TDataSource>) {
    this.icon = configuration.icon;
    this.name = configuration.name;

    if (!isDefined(configuration.disabled)) {
      this.disabled = () => false;
    } else {
      if (typeof configuration.disabled === 'boolean') {
        this.disabled = () => configuration.disabled as boolean;
      } else {
        this.disabled = configuration.disabled;
      }
    }

    if (!isDefined(configuration.hide)) {
      this.hide = () => false;
    } else {
      if (typeof configuration.hide === 'boolean') {
        this.hide = () => configuration.hide as boolean;
      } else {
        this.hide = configuration.hide;
      }
    }

    this.onClick = configuration.onClick;
  }
}
