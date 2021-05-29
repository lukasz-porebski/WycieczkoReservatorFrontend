import { Component, OnInit, ViewChild } from '@angular/core';
import { AppTableComponent } from '../../../../shared/components/wrappers/app-table/app-table.component';
import { AppTableModel } from '../../../../shared/components/wrappers/app-table/models/app-table.model';
import { Router } from '@angular/router';
import { ModalService } from '../../../../shared/services/modal.service';
import { IAppTableColumnConfiguration } from '../../../../shared/components/wrappers/app-table/models/app-table-column.model';
import { AppTableColumnType } from '../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { IAppTableColumnActionConfiguration } from '../../../../shared/components/wrappers/app-table/models/app-table-column-action.model';
import { AppIcon } from '../../../../shared/enums/app-icon.enum';
import { TripListApiModel } from './models/trip-list-api-model';
import { TripsListApiService } from './services/trips-list-api.service';
import { ITripsListActionConfirmationModalData, TripsListActionConfirmationModalComponent } from './modals/trips-list-action-confirmation-modal/trips-list-action-confirmation-modal.component';
import { AppRouting } from '../../../../core/configurations/routing/app-routing';
import { GuideToTripAssignerModalComponent } from './modals/guide-to-trip-assigner-modal/guide-to-trip-assigner-modal.component';
import { AuthenticationService } from '../../../../core/user-identity/services/authentication.service';
import { UserRole } from '../../../../core/user-identity/enums/user-role.enum';
import { IAppTableColumnActionsConfiguration } from '../../../../shared/components/wrappers/app-table/models/app-table-column-actions.model';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: [ './trips-list.component.scss' ]
})
export class TripsListComponent implements OnInit {
  @ViewChild(AppTableComponent) tableComponent: AppTableComponent;

  public readonly translateRoute = 'MODULES.TRIP.PAGES.TRIPS_LIST.';

  public tableConfig: AppTableModel<TripListApiModel>;

  constructor(private readonly _apiService: TripsListApiService,
              private readonly _router: Router,
              private readonly _modalService: ModalService,
              private readonly _authenticationService: AuthenticationService) {
  }

  public ngOnInit(): void {
    this.tableConfig = new AppTableModel<TripListApiModel>({
      translateRout: this.translateRoute + 'COLUMNS',
      headerSticky: true,
      dataSource: this._apiService.getTrips(),
      filter: {},
      columns: this._getColumns(),
      actionsDefinition: this._getActionsDefinition()
    });
  }

  private _getColumns(): IAppTableColumnConfiguration<TripListApiModel>[] {
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

  private _getActionsDefinition(): IAppTableColumnActionsConfiguration<TripListApiModel> {
    let result: IAppTableColumnActionsConfiguration<TripListApiModel> = {
      actions: []
    };

    const userRole = this._authenticationService.token?.userRole;

    switch (userRole) {
      case UserRole.User:
        result.actions = this._getUserActions();
        break;
      case UserRole.Guide:
        result = null;
        break;
      case UserRole.Admin:
        result.actions = this._getAdminActions();
        break;
      default:
        result.actions = [
          ...this._getAdminActions()
        ];
    }

    return result;
  }
  private _getUserActions(): IAppTableColumnActionConfiguration<TripListApiModel>[] {
    return [
      {
        icon: AppIcon.Forward,
        name: 'DETAILS',
        onClick: trip => {
          this._router.navigateByUrl(`${AppRouting.trip.tripView.absolutePath}/${trip.id}`);
        }
      }
    ]
}

  private _getAdminActions(): IAppTableColumnActionConfiguration<TripListApiModel>[] {
    return [
      {
        icon: AppIcon.Cancel,
        name: 'CANCEL_TRIP',
        onClick: tripp => {
          const modalData: ITripsListActionConfirmationModalData = {
            actionText: 'ARE_YOU_SURE_YOU_WANT_TO_CANCEL_TRIP',
            trip: tripp,
            action: trip => this._apiService.cancelTrip(trip.id)
          };
          this._openTripsListActionConfirmationModal(modalData);
        }
      },
      {
        icon: AppIcon.Edit,
        name: 'EDIT_TRIP',
        onClick: trip => {
          this._router.navigateByUrl(`${AppRouting.admin.tripEditor.absolutePath}/${trip.id}`);
        }
      },
      {
        icon: AppIcon.AssignUser,
        name: 'ASSIGNE_GUID',
        onClick: trip => {
          this._modalService.open(GuideToTripAssignerModalComponent, {
            data: trip,
            afterClosed: (result: boolean) => {
              if (result) {
                this.tableComponent.refreshDataSource();
              }
            }
          });
        }
      },
    ];
  }

  private _openTripsListActionConfirmationModal(modalData: ITripsListActionConfirmationModalData): void {
    this._modalService.open(TripsListActionConfirmationModalComponent, {
      data: modalData,
      afterClosed: (result: boolean) => {
        if (result) {
          this.tableComponent.refreshDataSource();
        }
      }
    });
  }
}
