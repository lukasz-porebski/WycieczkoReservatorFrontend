import { Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { SharedModule } from '../shared.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { isDefined } from '../utils/utils';
import { Subscription } from 'rxjs';

export interface IModalConfiguration<TData = any> {
  data?: TData;

  afterClosed?<TResult>(): (result: TResult) => void;
}

@Injectable({
  providedIn: SharedModule
})
export class ModalService implements OnDestroy {
  private readonly _subscription = new Subscription();

  constructor(private readonly _dialog: MatDialog) {
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public open<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
                 configuration?: IModalConfiguration): void {


    const dialogRef = this._dialog.open(componentOrTemplateRef, this._getConfig(configuration));

    if (isDefined(configuration?.afterClosed)) {
      const sub = dialogRef
        .afterClosed()
        .subscribe(configuration?.afterClosed);
      this._subscription.add(sub);
    }
  }

  private _getConfig(configuration?: IModalConfiguration): MatDialogConfig {
    let config: MatDialogConfig = new MatDialogConfig<any>();

    if (isDefined(configuration)) {
      config = new MatDialogConfig<any>();
      config.data = configuration?.data;
    }

    return config;
  }
}
