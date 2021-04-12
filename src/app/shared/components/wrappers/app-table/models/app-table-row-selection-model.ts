import { isDefined } from '../../../../utils/utils';

export interface IAppTableRowSelectionConfiguration<TDataSource> {
  onRowSelect?: (row: TDataSource) => void;
  initialSelection?: (data: TDataSource[]) => TDataSource;
}

export class AppTableRowSelectionModel<TDataSource> {
  public readonly onRowSelect: (row: TDataSource) => void;
  public readonly initialSelection: (data: TDataSource[]) => TDataSource;

  constructor(configuration: IAppTableRowSelectionConfiguration<TDataSource>) {
    this.onRowSelect = isDefined(configuration.onRowSelect)
      ? configuration.onRowSelect
      : () => {
      };
    this.initialSelection = isDefined(configuration.initialSelection)
      ? configuration.initialSelection
      : () => null;
  }
}
