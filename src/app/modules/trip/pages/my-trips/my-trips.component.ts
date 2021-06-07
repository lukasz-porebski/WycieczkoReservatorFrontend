import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouting } from 'src/app/core/configurations/routing/app-routing';
import { UserRole } from 'src/app/core/user-identity/enums/user-role.enum';
import { AuthenticationService } from 'src/app/core/user-identity/services/authentication.service';
import { AppTableComponent } from 'src/app/shared/components/wrappers/app-table/app-table.component';
import { AppTableColumnType } from 'src/app/shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { IAppTableColumnActionConfiguration } from 'src/app/shared/components/wrappers/app-table/models/app-table-column-action.model';
import { IAppTableColumnActionsConfiguration } from 'src/app/shared/components/wrappers/app-table/models/app-table-column-actions.model';
import { IAppTableColumnConfiguration } from 'src/app/shared/components/wrappers/app-table/models/app-table-column.model';
import { AppTableModel } from 'src/app/shared/components/wrappers/app-table/models/app-table.model';
import { AppIcon } from 'src/app/shared/enums/app-icon.enum';
import { MyTripsApiModel } from './models/my-trips-api-model';
import { MyTripsApiService } from './services/my-trips-api.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss']
})
export class MyTripsComponent implements OnInit {
  @ViewChild(AppTableComponent) tableComponent: AppTableComponent;

  public readonly translateRoute = 'MODULES.TRIP.PAGES.TRIPS_LIST.';

 public tableConfig: AppTableModel<MyTripsApiModel>;

 constructor(private readonly _apiService: MyTripsApiService,
  private readonly _router: Router,
  private readonly _authenticationService: AuthenticationService) {
}

public ngOnInit(): void {
  this.tableConfig = new AppTableModel<MyTripsApiModel>({
    translateRout: this.translateRoute + 'COLUMNS',
    headerSticky: true,
    dataSource: this._apiService.getTrips(),
    filter: {},
    columns: this._getColumns(),
    actionsDefinition: this._getActionsDefinition()
  });
}

private _getColumns(): IAppTableColumnConfiguration<MyTripsApiModel>[] {
  return [
    {
      field: 'title',
      imgPatch: data => data.mainImageUrl,
      type: AppTableColumnType.Text,
    },
    {
      field: 'minPrice',
      type: AppTableColumnType.Price,
    }
  ];
}

private _getActionsDefinition(): IAppTableColumnActionsConfiguration<MyTripsApiModel> {
  let result: IAppTableColumnActionsConfiguration<MyTripsApiModel> = {
    actions: []
  };

  const userRole = this._authenticationService.token?.userRole;

  switch (userRole) {
    case UserRole.User:
      result.actions = this._getUserActions();
      break;
    default:
      result = null;
  }

  return result;

}

private _getUserActions(): IAppTableColumnActionConfiguration<MyTripsApiModel>[] {
  return [
    {
      icon: AppIcon.Forward,
      name: 'DETAILS',
      onClick: trip => {
        actionText: 'DETAILS'
        this._router.navigateByUrl(`${AppRouting.trip.bookingDetails.absolutePath}/${trip.reservationId}`);
      }
    }
  ]
}


}
