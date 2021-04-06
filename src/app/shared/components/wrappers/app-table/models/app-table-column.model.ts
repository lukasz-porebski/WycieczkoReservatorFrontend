import { AppTableColumnType } from '../enums/app-table-column-type.enum';
import { isDefined } from '../../../../utils/utils';
import { ValueTextPairModel } from '../../../../models/value-text-pair-model';

export interface IAppTableColumnConfiguration<TDataSource> {
  field: string;
  sticky?: boolean;
  stickyEnd?: boolean;
  type?: AppTableColumnType;
  minWidth?: string;
  imgPatch?: (data: TDataSource) => string;
  enumDefinition?: ReadonlyArray<ValueTextPairModel<any>>;
}

export class AppTableColumnModel<TDataSource> {
  public field: string;
  public sticky?: boolean;
  public stickyEnd?: boolean;
  public type: AppTableColumnType;
  public minWidth: string;
  public imgPatch: (data: TDataSource) => string;
  public markRow: boolean;
  public enumDefinition: ValueTextPairModel<any>[];

  constructor(configuration: IAppTableColumnConfiguration<TDataSource>) {
    this.field = configuration.field;
    this.sticky = configuration.sticky;
    this.stickyEnd = configuration.stickyEnd;
    this.type = isDefined(configuration.type) ? configuration.type : AppTableColumnType.Text;
    this.minWidth = configuration.minWidth;
    this.imgPatch = configuration.imgPatch;
    this.enumDefinition = isDefined(configuration.enumDefinition)
      ? [ ...configuration.enumDefinition ]
      : [];
  }

  public getData(dataSource: TDataSource): any {
    return dataSource[this.field];
  }

  public getEnumText(enumValue: any): string {
    return this.enumDefinition.find(e => e.value === enumValue).text;
  }
}
