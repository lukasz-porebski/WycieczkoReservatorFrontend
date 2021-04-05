import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserListModel } from '../../models/user-list-model';
import { UserRoleFactory } from '../../../../../../core/user-identity/factories/user-role-factory';
import { UserRoleModel } from '../../../../../../core/user-identity/models/user-role-model';
import { UsersListApiService } from '../../services/users-list-api.service';
import { ChangeUserRoleRequestModel } from './models/requests/change-user-role-request-model';
import { AppModalModel } from '../../../../../../shared/components/wrappers/app-modal/models/app-modal.model';
import { AppButtonModel } from '../../../../../../shared/components/wrappers/app-button/models/app-button.model';

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

  public selectedRole: UserRoleModel;
  public otherRoles: UserRoleModel[] = [];
  public modalConfig: AppModalModel;
  public button: AppButtonModel;

  private _showSpinner = false;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: UserListModel,
              private readonly _matDialogRef: MatDialogRef<UserRoleChangeModalComponent>,
              private readonly _userRoleFactory: UserRoleFactory,
              private readonly _adminApiService: UsersListApiService) {
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
    const request = new ChangeUserRoleRequestModel(this.data.id, this.selectedRole.value);

    this._adminApiService
      .changeRole(request)
      .subscribe(
        () => this._matDialogRef.close(true)
      );
  }
}
