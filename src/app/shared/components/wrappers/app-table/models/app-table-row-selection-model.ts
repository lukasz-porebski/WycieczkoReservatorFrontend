import { isDefined } from '../../../../utils/utils';

export interface IAppTableRowSelectionConfiguration<TDataSource> {
  onRowSelect?: (row: TDataSource) => void;
}

export class AppTableRowSelectionModel<TDataSource> {
  public readonly onRowSelect: (row: TDataSource) => void;

  constructor(configuration: IAppTableRowSelectionConfiguration<TDataSource>) {
    this.onRowSelect = isDefined(configuration.onRowSelect)
      ? configuration.onRowSelect
      : () => {
      };
  }
}
