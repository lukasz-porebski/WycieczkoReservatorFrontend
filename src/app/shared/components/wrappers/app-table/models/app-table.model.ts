import { Observable } from 'rxjs';
import { IAppTableColumnConfiguration, AppTableColumnModel } from './app-table-column.model';
import { IAppTableColumnActionsConfiguration, AppTableColumnActionsModel } from './app-table-column-actions.model';
import { isDefined, replaceIfNotDefined } from '../../../../utils/utils';
import { AppTableColumnActionModel, IAppTableColumnActionConfiguration } from './app-table-column-action.model';
import { IAppTableColumnWithIcon, AppTableColumnWithIconModel } from './app-table-column-with-icon.model';
import { AppTablePaginatorModel, IAppTablePaginatorConfiguration } from './app-table-paginator.model';
import { AppTableFilterModel, IAppTableFilterConfiguration } from './app-table-filter.model';
import { AppTableRowSelectionModel, IAppTableRowSelectionConfiguration } from './app-table-row-selection-model';

export interface IAppTableConfiguration<TDataSource> {
  translateRout: string;
  dataSource: Observable<TDataSource[]>;
  columns: IAppTableColumnConfiguration<TDataSource>[];
  columnsWithIcon?: IAppTableColumnWithIcon<TDataSource>[];
  actionsDefinition?: IAppTableColumnActionsConfiguration<TDataSource>;
  headerSticky?: boolean;
  paginator?: IAppTablePaginatorConfiguration;
  filter?: IAppTableFilterConfiguration;
  markRowCondition?: (row: TDataSource) => boolean;
  selection?: IAppTableRowSelectionConfiguration<TDataSource>;
}

export class AppTableModel<TDataSource> {
  public readonly translateRout: string;
  public readonly dataSource: Observable<TDataSource[]>;
  public readonly columns: AppTableColumnModel<TDataSource>[];
  public readonly columnsWithIcon: AppTableColumnWithIconModel<TDataSource>[];
  public readonly actionsDefinition: AppTableColumnActionsModel<TDataSource>;
  public readonly columnNames: string[];
  public readonly headerSticky: boolean;
  public readonly paginator: AppTablePaginatorModel;
  public readonly filter: AppTableFilterModel;
  public readonly markRowCondition: (row: TDataSource) => boolean;
  public readonly selection?: AppTableRowSelectionModel<TDataSource>;

  constructor(configuration: IAppTableConfiguration<TDataSource>) {
    this.translateRout = configuration.translateRout;
    this.dataSource = configuration.dataSource;
    this.columns = configuration.columns.map(c => {
      return new AppTableColumnModel(c);
    });

    this.columnsWithIcon = replaceIfNotDefined(configuration.columnsWithIcon, [])
      .map(c => new AppTableColumnWithIconModel<TDataSource>(c));

    if (isDefined(configuration.actionsDefinition)) {
      this.actionsDefinition = new AppTableColumnActionsModel(configuration.actionsDefinition);
    }

    this.columnNames = this._getColumnNames(this.columns, this.columnsWithIcon, this.actionsDefinition);
    this.headerSticky = isDefined(configuration.headerSticky) ? configuration.headerSticky : false;
    this.paginator = isDefined(configuration.paginator)
      ? new AppTablePaginatorModel(configuration.paginator)
      : null;
    this.filter = isDefined(configuration.filter)
      ? new AppTableFilterModel(configuration.filter)
      : null;
    this.markRowCondition = isDefined(configuration.markRowCondition)
      ? configuration.markRowCondition
      : () => false;
    this.selection = isDefined(configuration.selection)
      ? new AppTableRowSelectionModel<TDataSource>(configuration.selection)
      : null;
  }

  public getColumnName(
    column: AppTableColumnModel<TDataSource>
      | AppTableColumnActionModel<TDataSource>): string {
    if (column instanceof AppTableColumnModel) {
      return column.field;
    } else {
      return column.name.toCamelCase();
    }
  }

  public getColumnNameTranslateRoute(
    column: AppTableColumnModel<TDataSource>
      | AppTableColumnActionModel<TDataSource>): string {
    return `${this.translateRout}.${this.getColumnName(column).toSnakeCase().toUpperCase()}`;
  }

  private _getColumnNames(columns: AppTableColumnModel<TDataSource>[],
                          columnsWithIcon: AppTableColumnWithIconModel<TDataSource>[],
                          actionsDefinition: AppTableColumnActionsModel<TDataSource>): string[] {
    const columnNames = columns.map(c => this.getColumnName(c));

    columnsWithIcon.forEach(c => columnNames.push(c.columnName));

    if (isDefined(actionsDefinition)) {
      columnNames.push(actionsDefinition.name);
    }

    return columnNames;
  }
}
