import { Component, OnInit, ViewChild } from '@angular/core';
import { AppTableColumnType } from '../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { AppTableModel } from '../../../../shared/components/wrappers/app-table/models/app-table.model';
import { UserListModel } from './models/user-list-model';
import { Router } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { AppIcon } from '../../../../shared/enums/app-icon.enum';
import { ModalService } from '../../../../shared/services/modal.service';
import { UserRoleChangeComponent } from './components/user-role-change/user-role-change.component';
import { AppTableComponent } from '../../../../shared/components/wrappers/app-table/app-table.component';

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
      columns: [
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
        }
      ],
      actionsDefinition: {
        actions: [
          {
            icon: AppIcon.Edit,
            name: 'CHANGE_ROLE',
            onClick: user => {
              this._modalService.open(UserRoleChangeComponent, {
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
            onClick: rowValue => {
              console.log(rowValue);
            }
          },
          {
            icon: AppIcon.Password,
            name: 'FORCE_PASSWORD_CHANGE',
            onClick: rowValue => {
              console.log(rowValue);
            }
          }
        ]
      }
    });
  }
}
