import { Component, Inject, OnInit } from '@angular/core';
import { AppTableModel } from '../../../../../../shared/components/wrappers/app-table/models/app-table.model';
import { AppTableColumnType } from '../../../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { TripsListApiService } from '../../services/trips-list-api.service';
import { UserListApiModel } from '../../../../../admin/pages/users-list/models/user-list-api-model';
import { AppModalModel } from '../../../../../../shared/components/wrappers/app-modal/models/app-modal.model';
import { isDefined } from '../../../../../../shared/utils/utils';
import { AppButtonModel } from '../../../../../../shared/components/wrappers/app-button/models/app-button.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TripListApiModel } from '../../models/trip-list-api-model';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../../../shared/services/error.service';

@Component({
  selector: 'app-guide-to-trip-assigner-modal',
  templateUrl: './guide-to-trip-assigner-modal.component.html',
  styleUrls: [ './guide-to-trip-assigner-modal.component.scss' ]
})
export class GuideToTripAssignerModalComponent implements OnInit {
  public get selectedDifferentGuide(): boolean {
    return isDefined(this.selectedGuide) && (this.selectedGuide.id !== this.data.guideId);
  }

  public readonly translateRoute = 'MODULES.TRIP.PAGES.TRIPS_LIST.MODALS.GUIDE_TO_TRIP_ASSIGNER.';

  public showSpinner: boolean;
  public modalConfig: AppModalModel;
  public tableConfig: AppTableModel<UserListApiModel>;
  public selectedGuide: UserListApiModel;
  public button: AppButtonModel;
  public errors: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: TripListApiModel,
              private readonly _matDialogRef: MatDialogRef<GuideToTripAssignerModalComponent>,
              private readonly _apiService: TripsListApiService,
              private readonly _errorService: ErrorService) {
  }

  public ngOnInit(): void {
    this.modalConfig = new AppModalModel({
      text: this.translateRoute + 'TITLE',
    });

    this.tableConfig = new AppTableModel<UserListApiModel>({
      translateRout: this.translateRoute + 'COLUMNS',
      selection: {
        onRowSelect: row => this.selectedGuide = row,
        initialSelection: data => {
          const guide = data.find(d => d.id === this.data.guideId);
          this.selectedGuide = guide;
          return guide;
        }
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
        this.showSpinner = true;
        this._apiService
          .assigneGuideToTrip(this.data.id, this.selectedGuide.id)
          .subscribe(() => {
              this._matDialogRef.close(true);
            },
            (error: HttpErrorResponse) => {
              this.errors = this._errorService.extractSingleMessageAsCollection(error);
              this.showSpinner = false;
            });
      },
      label: {
        text: this.translateRoute + 'ASSIGNE_GUID',
      },
    });
  }
}
