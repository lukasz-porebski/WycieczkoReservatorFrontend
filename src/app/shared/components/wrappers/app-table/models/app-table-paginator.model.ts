import { AppTablePaginatorPageSize } from '../enums/app-table-paginator-page-size.enum';
import { isDefined } from '../../../../utils/utils';

export interface IAppTablePaginatorConfiguration {
  defaultPageSize?: AppTablePaginatorPageSize;
  showFirstLastButtons?: boolean;
}

export class AppTablePaginatorModel {
  public defaultPageSize: AppTablePaginatorPageSize;
  public showFirstLastButtons: boolean;

  constructor(configuration: IAppTablePaginatorConfiguration) {
    this.defaultPageSize = isDefined(configuration.defaultPageSize)
      ? configuration.defaultPageSize
      : AppTablePaginatorPageSize.Ten;
    this.showFirstLastButtons = isDefined(configuration.showFirstLastButtons)
      ? configuration.showFirstLastButtons
      : true;
  }

  public getPageSizes(): number[] {
    return [
      AppTablePaginatorPageSize.Five,
      AppTablePaginatorPageSize.Ten,
      AppTablePaginatorPageSize.TwentyFive,
      AppTablePaginatorPageSize.Fifty,
      AppTablePaginatorPageSize.Hundred,
    ];
  }
}
