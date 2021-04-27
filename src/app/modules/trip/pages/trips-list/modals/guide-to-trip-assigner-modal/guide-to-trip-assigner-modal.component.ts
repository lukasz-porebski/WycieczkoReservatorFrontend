import { Component, Inject, OnInit } from '@angular/core';
import { AppTableModel } from '../../../../../../shared/components/wrappers/app-table/models/app-table.model';
import { AppTableColumnType } from '../../../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { TripsListApiService } from '../../services/trips-list-api.service';
import { UserListModel } from '../../../../../admin/pages/users-list/models/user-list-model';
import { AppModalModel } from '../../../../../../shared/components/wrappers/app-modal/models/app-modal.model';
import { isDefined } from '../../../../../../shared/utils/utils';
import { AppButtonModel } from '../../../../../../shared/components/wrappers/app-button/models/app-button.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TripListApiModel } from '../../models/trip-list-api-model';
import { AssigneGuideToTripRequestModel } from './models/requests/assigne-guide-to-trip-request-model';

@Component({
  selector: 'app-guide-to-trip-assigner-modal',
  templateUrl: './guide-to-trip-assigner-modal.component.html',
  styleUrls: [ './guide-to-trip-assigner-modal.component.scss' ]
})
export class GuideToTripAssignerModalComponent implements OnInit {
  public get isGuideSelected(): boolean {
    return isDefined(this.selectedGuide);
  }

  public readonly translateRoute = 'MODULES.TRIP.PAGES.TRIPS_LIST.MODALS.GUIDE_TO_TRIP_ASSIGNER.';

  public showSpinner: boolean;
  public modalConfig: AppModalModel;
  public tableConfig: AppTableModel<UserListModel>;
  public selectedGuide: UserListModel;
  public button: AppButtonModel;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: TripListApiModel,
              private readonly _matDialogRef: MatDialogRef<GuideToTripAssignerModalComponent>,
              private readonly _apiService: TripsListApiService) {
  }

  public ngOnInit(): void {
    this.modalConfig = new AppModalModel({
      text: this.translateRoute + 'TITLE',
    });

    this.tableConfig = new AppTableModel<UserListModel>({
      translateRout: this.translateRoute + 'COLUMNS',
      selection: {
        onRowSelect: row => this.selectedGuide = row
      },
      dataSource: this._apiService.getGuidesToTripAssigne(this.data.id),
      paginator: {
        defaultPageSize: 5
      },
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
      ]
    });

    this.button = new AppButtonModel({
      onClick: () => {
        const request = new AssigneGuideToTripRequestModel(this.data.id, this.selectedGuide.id);
        this._matDialogRef.close(true);
      },
      label: {
        text: this.translateRoute + 'ASSIGNE_GUID',
      },
    });
  }

}
