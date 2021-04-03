import { Component, Inject, OnInit } from '@angular/core';
import { AppModalModel } from '../../../../../../shared/components/wrappers/app-modal/models/app-modal.model';
import { AppButtonModel } from '../../../../../../shared/components/wrappers/app-button/models/app-button.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserListModel } from '../../models/user-list-model';
import { Observable } from 'rxjs/internal/Observable';

export interface IUserListActionConfirmationModalData {
  actionText: string;
  user: UserListModel;
  action: (user: UserListModel) => Observable<any>;
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

  private _showSpinner = false;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: IUserListActionConfirmationModalData,
              private readonly _matDialogRef: MatDialogRef<UserListActionConfirmationModalComponent>) {
  }

  public ngOnInit(): void {
    this.modalConfig = new AppModalModel();

    this.yesButton = new AppButtonModel({
      onClick: () => this.onChangeRole(),
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

  public onChangeRole(): void {
    this._showSpinner = true;
    this.data.action(this.data.user).subscribe(
      () => this._matDialogRef.close(true)
    );
  }
}
