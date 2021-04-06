import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppTableModel } from './models/app-table.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { toPercent, isDefined, isNotEmpty, toPrice } from '../../../utils/utils';
import { AppTableColumnType } from './enums/app-table-column-type.enum';
import { DateFormat } from '../../../enums/date-format.enum';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { AppTableColumnActionModel } from './models/app-table-column-action.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: [ './app-table.component.scss' ]
})
export class AppTableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  @Input() configuration: AppTableModel<any>;

  public get shouldShowSpinner(): boolean {
    return this._spinner;
  }

  public get isTableEmpty(): boolean {
    return isDefined(this.dataSource) && isNotEmpty(this.dataSource.data);
  }

  public get isSelectionEnable(): boolean {
    return isDefined(this.configuration.selection);
  }

  public readonly translateRoute = 'SHARED.COMPONENTS.APP_TABLE.';
  public readonly AppTableColumnType = AppTableColumnType;
  public readonly DateFormat = DateFormat;
  public readonly selection = new SelectionModel<any>(false, []);

  public dataSource: MatTableDataSource<any>;

  private readonly _subscription = new Subscription();

  private _spinner = false;

  constructor(private readonly _translateService: TranslateService) {
  }

  public ngAfterViewInit(): void {
    Promise.resolve().then(() => this.refreshDataSource());
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public refreshDataSource(): void {
    this._spinner = true;

    const sub = this.configuration
      .dataSource
      .subscribe(d => {
        this.dataSource = new MatTableDataSource<any>(d);
        this.dataSource.sort = this.matSort;
        const itemsPerPageLabel = this._translateService
          .instant(this.translateRoute + 'PAGINATOR.ITEMS_PER_PAGE_LABEL');
        this.dataSource.paginator = this.matPaginator;
        if (isDefined(this.matPaginator)) {
          this.matPaginator._intl.itemsPerPageLabel = itemsPerPageLabel;
        }
        this._spinner = false;
      });

    this._subscription.add(sub);
  }

  public showSpinner(): void {
    this._spinner = true;
  }

  public getPercent(value: number): string {
    return toPercent(value);
  }

  public getPrice(value: number): string {
    return toPrice(value);
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public applyBooleanOrCallableColumnValue<T>(value: boolean | ((rowValue: Readonly<T>) => boolean),
                                              data: T): boolean {
    return typeof value === 'boolean' ? value : value(data);
  }

  public onRowClick(row: any): void {
    if (this.isSelectionEnable) {
      this.configuration.selection.onRowSelect(row);
      this.selection.toggle(row);
    }
  }

  public onMouseOver(row: any): void {
    if (this.isSelectionEnable) {
      row.hovered = true;
    }
  }

  public onMouseOut(row: any): void {
    if (this.isSelectionEnable) {
      row.hovered = false;
    }
  }
}
