import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { isDefined, getPercent, isEmpty } from '../../../utils/utils';
import { Subscription } from 'rxjs';
import { AppListRowElementType } from './enums/app-list-row-element-type.enum';
import { DateFormat } from '../../../enums/date-format.enum';
import { AppListModel } from './models/app-list.model';
import { AppListRowElementModel } from './models/app-list-row-element.model';
import { AppListIconSide } from './enums/app-list-icon-side.enum';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: [ './app-list.component.scss' ]
})
export class AppListComponent implements OnInit, OnDestroy {
  @Input() configuration: AppListModel<any>;

  public get shouldShowSpinner(): boolean {
    return this._spinner;
  }

  public get isListEmpty(): boolean {
    return isDefined(this.dataSource) && isEmpty(this.dataSource);
  }

  public readonly AppRowElementType = AppListRowElementType;
  public readonly DateFormat = DateFormat;
  public readonly IconSide = AppListIconSide;

  public dataSource: any[];

  private readonly _subscription = new Subscription();

  private _spinner = false;

  ngOnInit() {
    this.refreshDataSource();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  public refreshDataSource(): void {
    this._spinner = true;

    const sub = this.configuration.dataSource.subscribe(d => {
      this.dataSource = d;
      this._spinner = false;
    });

    this._subscription.add(sub);
  }

  public showSpinner(): void {
    this._spinner = true;
  }

  public getRowElementData(data: any, rowElement: AppListRowElementModel<any>): any {
    return typeof rowElement.dataSource === 'string'
      ? data[rowElement.dataSource]
      : rowElement.dataSource(data);
  }

  public getPercent(value: number): string {
    return getPercent(value);
  }
}
