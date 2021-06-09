import { Component, Inject, OnInit } from '@angular/core';
import { AppModalModel } from '../../../../../../shared/components/wrappers/app-modal/models/app-modal.model';
import { AppButtonModel } from '../../../../../../shared/components/wrappers/app-button/models/app-button.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserListApiModel } from '../../models/user-list-api-model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../../../shared/services/error.service';
import { NotificationService, NotificationType } from '../../../../../../shared/services/notification.service';

export interface IUserListActionConfirmationModalData {
  actionText: string;
  successText: string;
  user: UserListApiModel;
  action: (user: UserListApiModel) => Observable<any>;
}

@Component({
  selector: 'app-user-list-action-confirmation-modal',
  templateUrl: './user-list-action-confirmation-modal.component.html',
  styleUrls: [ './user-list-action-confirmation-modal.component.scss' ]
})
export class UserListActionConfirmationModalComponent implements OnInit {
  public get showSpinner(): boolean {
    return this._showSpinner;
  }

  public readonly translateRoute = 'MODULES.ADMIN.PAGES.USERS_LIST.MODALS.USER_LIST_ACTION.';

  public modalConfig: AppModalModel;
  public yesButton: AppButtonModel;
  public noButton: AppButtonModel;
  public errors: string[] = [];

  private _showSpinner = false;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: IUserListActionConfirmationModalData,
              private readonly _matDialogRef: MatDialogRef<UserListActionConfirmationModalComponent>,
              private readonly _errorService: ErrorService,
              private readonly _notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.modalConfig = new AppModalModel();

    this.yesButton = new AppButtonModel({
      onClick: () => {
        this._showSpinner = true;
        this.data.action(this.data.user).subscribe(
          () => {
            const message = this.translateRoute + this.data.successText;
            this._notificationService.showNotification(message, NotificationType.Success);
            this._matDialogRef.close(true);
          },
          (error: HttpErrorResponse) => {
            this.errors = this._errorService.extractSingleMessageAsCollection(error);
            this._showSpinner = false;
          });
      },
      label: {
        text: this.translateRoute + 'YES',
      },
    });

    this.noButton = new AppButtonModel({
      onClick: () => this._matDialogRef.close(false),
      label: {
        text: this.translateRoute + 'NO',
      },
    });
  }
}
