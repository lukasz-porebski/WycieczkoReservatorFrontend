import { Component, OnInit, ViewChild } from '@angular/core';
import { AppTableComponent } from '../../../../shared/components/wrappers/app-table/app-table.component';
import { AppTableModel } from '../../../../shared/components/wrappers/app-table/models/app-table.model';
import { Router } from '@angular/router';
import { ModalService } from '../../../../shared/services/modal.service';
import { IAppTableColumnConfiguration } from '../../../../shared/components/wrappers/app-table/models/app-table-column.model';
import { AppTableColumnType } from '../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { IAppTableColumnActionConfiguration } from '../../../../shared/components/wrappers/app-table/models/app-table-column-action.model';
import { AppIcon } from '../../../../shared/enums/app-icon.enum';
import { TripListModel } from './models/trip-list-model';
import { TripApiService } from '../../services/trip-api.service';
import { ITripsListActionConfirmationModalData, TripsListActionConfirmationModalComponent } from './modals/trips-list-action-confirmation-modal/trips-list-action-confirmation-modal.component';
import { AppRouting } from '../../../../core/configurations/routing/app-routing';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: [ './trips-list.component.scss' ]
})
export class TripsListComponent implements OnInit {
  @ViewChild(AppTableComponent) tableComponent: AppTableComponent;

  public readonly translateRoute = 'MODULES.TRIP.PAGES.TRIPS_LIST.';

  public tableConfig: AppTableModel<TripListModel>;

  constructor(private readonly _tripApiService: TripApiService,
              private readonly _router: Router,
              private readonly _modalService: ModalService) {
  }

  public ngOnInit(): void {
    this.tableConfig = new AppTableModel<TripListModel>({
      translateRout: this.translateRoute + 'COLUMNS',
      headerSticky: true,
      dataSource: this._tripApiService.getTrips(),
      filter: {},
      columns: this._getColumns(),
      actionsDefinition: {
        actions: this._getActions()
      }
    });
  }

  private _getColumns(): IAppTableColumnConfiguration<TripListModel>[] {
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

  private _getActions(): IAppTableColumnActionConfiguration<TripListModel>[] {
    return [
      {
        icon: AppIcon.Cancel,
        name: 'CANCEL_TRIP',
        onClick: tripp => {
          const modalData: ITripsListActionConfirmationModalData = {
            actionText: 'ARE_YOU_SURE_YOU_WANT_TO_CANCEL_TRIP',
            trip: tripp,
            action: trip => this._tripApiService.cancelTrip(trip.id)
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
      }
    ];
  }

  private _openTripsListActionConfirmationModal(modalData: ITripsListActionConfirmationModalData): void {
    this._modalService.open(TripsListActionConfirmationModalComponent, {
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
