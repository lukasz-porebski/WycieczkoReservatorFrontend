import { Component, OnInit, ViewChild } from '@angular/core';
import { AppTableColumnType } from '../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { AppTableModel } from '../../../../shared/components/wrappers/app-table/models/app-table.model';
import { UserListModel } from './models/user-list-model';
import { Router } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { AppIcon } from '../../../../shared/enums/app-icon.enum';
import { ModalService } from '../../../../shared/services/modal.service';
import { UserRoleChangeModalComponent } from './modals/user-role-change-modal/user-role-change-modal.component';
import { AppTableComponent } from '../../../../shared/components/wrappers/app-table/app-table.component';
import { IUserListActionConfirmationModalData, UserListActionConfirmationModalComponent } from './modals/user-list-action-confirmation-modal/user-list-action-confirmation-modal.component';
import { IAppTableColumnConfiguration } from '../../../../shared/components/wrappers/app-table/models/app-table-column.model';
import { IAppTableColumnActionConfiguration } from '../../../../shared/components/wrappers/app-table/models/app-table-column-action.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: [ './users-list.component.scss' ]
})
export class UsersListComponent implements OnInit {
  @ViewChild(AppTableComponent) tableComponent: AppTableComponent;

  public readonly translateRoute = 'MODULES.ADMIN.PAGES.USERS_LIST.';

  public tableConfig: AppTableModel<UserListModel>;

  constructor(private readonly _adminApiService: AdminApiService,
              private readonly _router: Router,
              private readonly _modalService: ModalService) {
  }

  public ngOnInit(): void {
    this.tableConfig = new AppTableModel<UserListModel>({
      translateRout: this.translateRoute + 'COLUMNS',
      headerSticky: true,
      dataSource: this._adminApiService.getUsers(),
      filter: {},
      columns: this._getColumns(),
      actionsDefinition: {
        actions: this._getActions()
      }
    });
  }

  private _getColumns(): IAppTableColumnConfiguration<UserListModel>[] {
    return [
      {
        field: 'email',
        type: AppTableColumnType.Text,
      },
      {
        field: 'firstName',
        type: AppTableColumnType.Text,
      },
      {
        field: 'lastName',
        type: AppTableColumnType.Text,
      },
      {
        field: 'role',
        type: AppTableColumnType.Number
      },
      {
        field: 'isBlocked',
        type: AppTableColumnType.Boolean
      },
      {
        field: 'isForcedPasswordChange',
        type: AppTableColumnType.Boolean
      }
    ];
  }

  private _getActions(): IAppTableColumnActionConfiguration<UserListModel>[] {
    return [
      {
        icon: AppIcon.Edit,
        name: 'CHANGE_ROLE',
        onClick: user => {
          this._modalService.open(UserRoleChangeModalComponent, {
            data: user,
            afterClosed: (changedRole: boolean) => {
              if (changedRole) {
                this.tableComponent.refreshDataSource();
              }
            }
          });
        }
      },
      {
        icon: AppIcon.Lock,
        name: 'BLOCK',
        hide: user => user.isBlocked,
        onClick: userr => {
          const modalData: IUserListActionConfirmationModalData = {
            actionText: 'ARE_YOU_SURE_YOU_WANT_TO_BLOCK_USER',
            user: userr,
            action: user => this._adminApiService.blockUser(user.id)
          };
          this._openUserListActionConfirmationModal(modalData);
        }
      },
      {
        icon: AppIcon.LockOpen,
        name: 'UNBLOCK',
        hide: user => !user.isBlocked,
        onClick: userr => {
          const modalData: IUserListActionConfirmationModalData = {
            actionText: 'ARE_YOU_SURE_YOU_WANT_TO_UNBLOCK_USER',
            user: userr,
            action: user => this._adminApiService.unblockUser(user.id)
          };
          this._openUserListActionConfirmationModal(modalData);
        }
      },
      {
        icon: AppIcon.Password,
        name: 'FORCE_PASSWORD_CHANGE',
        hide: user => user.isForcedPasswordChange,
        onClick: userr => {
          const modalData: IUserListActionConfirmationModalData = {
            actionText: 'ARE_YOU_SURE_YOU_WANT_TO_FORCE_PASSWORD_CHANGE',
            user: userr,
            action: user => this._adminApiService.forcePasswordChange(user.id)
          };
          this._openUserListActionConfirmationModal(modalData);
        }
      },
      {
        icon: AppIcon.Undo,
        name: 'UNDO_FORCE_PASSWORD_CHANGE',
        hide: user => !user.isForcedPasswordChange,
        onClick: userr => {
          const modalData: IUserListActionConfirmationModalData = {
            actionText: 'ARE_YOU_SURE_YOU_WANT_TO_UNDO_FORCE_PASSWORD_CHANGE',
            user: userr,
            action: user => this._adminApiService.undoForcePasswordChange(user.id)
          };
          this._openUserListActionConfirmationModal(modalData);
        }
      }
    ];
  }

  private _openUserListActionConfirmationModal(modalData: IUserListActionConfirmationModalData): void {
    this._modalService.open(UserListActionConfirmationModalComponent, {
      data: modalData,
      afterClosed: (result: boolean) => {
        console.log('Action result', result);
        if (result) {
          this.tableComponent.refreshDataSource();
        }
      }
    });
  }
}
