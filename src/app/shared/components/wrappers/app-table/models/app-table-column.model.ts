import { AppTableColumnType } from '../enums/app-table-column-type.enum';
import { isDefined, isNotEmpty } from '../../../../utils/utils';

export interface IAppTableColumnConfiguration<TDataSource> {
  field: string;
  sticky?: boolean;
  stickyEnd?: boolean;
  type?: AppTableColumnType;
  minWidth?: string;
  imgPatch?: (data: TDataSource) => string;
}

export class AppTableColumnModel<TDataSource> {
  public field: string;
  public sticky?: boolean;
  public stickyEnd?: boolean;
  public type: AppTableColumnType;
  public minWidth: string;
  public imgPatch: (data: TDataSource) => string;

  constructor(configuration: IAppTableColumnConfiguration<TDataSource>) {
    this.field = configuration.field;
    this.sticky = configuration.sticky;
    this.stickyEnd = configuration.stickyEnd;
    this.type = isDefined(configuration.type) ? configuration.type : AppTableColumnType.Text;
    this.minWidth = configuration.minWidth;
    this.imgPatch = configuration.imgPatch;
  }

  public getData(dataSource: TDataSource): any {
    return dataSource[this.field];
  }
}
