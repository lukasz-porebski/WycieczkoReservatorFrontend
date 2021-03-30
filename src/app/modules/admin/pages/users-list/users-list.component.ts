import { Component, OnInit } from '@angular/core';
import { AppTableColumnType } from '../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { AppTableModel } from '../../../../shared/components/wrappers/app-table/models/app-table.model';
import { tap } from 'rxjs/operators';
import { UserListModel } from './models/user-list-model';
import { Router } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { AppIcon } from '../../../../shared/enums/app-icon.enum';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: [ './users-list.component.scss' ]
})
export class UsersListComponent implements OnInit {
  public readonly translateRoute = 'MODULES.ADMIN.PAGES.USERS_LIST.';

  public pageLoading = true;
  public tableConfig: AppTableModel<UserListModel>;

  constructor(private readonly _adminApiService: AdminApiService,
              private readonly _router: Router) {
  }

  public ngOnInit(): void {
    const users = this._adminApiService.getUsers().pipe(
      tap(() => this.pageLoading = false),
    );

    this.tableConfig = new AppTableModel<UserListModel>({
      translateRout: this.translateRoute + 'COLUMNS',
      headerSticky: true,
      dataSource: users,
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
            onClick: rowValue => {
              console.log(rowValue);
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
