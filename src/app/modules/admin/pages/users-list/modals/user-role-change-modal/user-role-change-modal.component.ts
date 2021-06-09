import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserListApiModel } from '../../models/user-list-api-model';
import { UserRoleFactory } from '../../../../../../core/user-identity/factories/user-role-factory';
import { UsersListApiService } from '../../services/users-list-api.service';
import { ChangeUserRoleRequestModel } from './models/requests/change-user-role-request-model';
import { AppModalModel } from '../../../../../../shared/components/wrappers/app-modal/models/app-modal.model';
import { AppButtonModel } from '../../../../../../shared/components/wrappers/app-button/models/app-button.model';
import { ValueTextPairModel } from '../../../../../../shared/models/value-text-pair-model';
import { UserRole } from '../../../../../../core/user-identity/enums/user-role.enum';
import { NotificationService, NotificationType } from '../../../../../../shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../../../shared/services/error.service';

@Component({
  selector: 'app-user-role-change-modal',
  templateUrl: './user-role-change-modal.component.html',
  styleUrls: [ './user-role-change-modal.component.scss' ]
})
export class UserRoleChangeModalComponent implements OnInit {
  public get showSpinner(): boolean {
    return this._showSpinner;
  }

  public readonly translateRoute = 'MODULES.ADMIN.PAGES.USERS_LIST.MODALS.USER_ROLE_CHANGE.';

  public selectedRole: ValueTextPairModel<UserRole>;
  public otherRoles: ValueTextPairModel<UserRole>[] = [];
  public modalConfig: AppModalModel;
  public button: AppButtonModel;
  public errors: string[] = [];

  private _showSpinner = false;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: UserListApiModel,
              private readonly _matDialogRef: MatDialogRef<UserRoleChangeModalComponent>,
              private readonly _userRoleFactory: UserRoleFactory,
              private readonly _adminApiService: UsersListApiService,
              private readonly _errorService: ErrorService,
              private readonly _notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.modalConfig = new AppModalModel({
      text: this.translateRoute + 'TITLE'
    });

    this.button = new AppButtonModel({
      onClick: () => this.onChangeRole(),
      label: {
        text: this.translateRoute + 'CHANGE_ROLE',
      },
    });

    const roles = this._userRoleFactory.createUserRoles();
    this.otherRoles = roles.filter(r => r.value !== this.data.role);
    this.selectedRole = this.otherRoles[0];
  }

  public onChangeRole(): void {
    this._showSpinner = true;
    const request = new ChangeUserRoleRequestModel(this.selectedRole.value);

    this._adminApiService
      .changeRole(this.data.id, request)
      .subscribe(
        () => {
          const message = this.translateRoute + 'SUCCESS_MESSAGE';
          this._notificationService.showNotification(message, NotificationType.Success);
          this._matDialogRef.close(true);
        },
        (error: HttpErrorResponse) => {
          this.errors = this._errorService.extractSingleMessageAsCollection(error);
          this._showSpinner = false;
        });
  }
}
