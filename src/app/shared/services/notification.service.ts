import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Warn = 'warn'
}

@Injectable({
  providedIn: SharedModule
})
export class NotificationService {

  constructor(private readonly _snackBar: MatSnackBar,
              private readonly _translateService: TranslateService) {
  }

  public showNotification(messageTranslateRoute: string, type: NotificationType): void {
    this.showNotificationWithoutTranslation(this._translateService.instant(messageTranslateRoute), type);
  }

  public showNotificationWithoutTranslation(message: string, type: NotificationType): void {
    this._snackBar.open(message, 'x', {
      direction: 'ltr',
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [ 'notification', `${type}-notification` ]
    });
  }
}
