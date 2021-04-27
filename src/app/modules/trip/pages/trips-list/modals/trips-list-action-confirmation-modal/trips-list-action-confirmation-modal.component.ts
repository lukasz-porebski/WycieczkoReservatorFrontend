import { Component, Inject, OnInit } from '@angular/core';
import { AppModalModel } from '../../../../../../shared/components/wrappers/app-modal/models/app-modal.model';
import { AppButtonModel } from '../../../../../../shared/components/wrappers/app-button/models/app-button.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { TripListApiModel } from '../../models/trip-list-api-model';

export interface ITripsListActionConfirmationModalData {
  actionText: string;
  trip: TripListApiModel;
  action: (trip: TripListApiModel) => Observable<any>;
}

@Component({
  selector: 'app-trips-list-action-confirmation-modal',
  templateUrl: './trips-list-action-confirmation-modal.component.html',
  styleUrls: [ './trips-list-action-confirmation-modal.component.scss' ]
})
export class TripsListActionConfirmationModalComponent implements OnInit {
  public get showSpinner(): boolean {
    return this._showSpinner;
  }

  public readonly translateRoute = 'MODULES.TRIP.PAGES.TRIPS_LIST.MODALS.TRIPS_LIST_ACTION.';

  public modalConfig: AppModalModel;
  public yesButton: AppButtonModel;
  public noButton: AppButtonModel;

  private _showSpinner = false;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: ITripsListActionConfirmationModalData,
              private readonly _matDialogRef: MatDialogRef<TripsListActionConfirmationModalComponent>) {
  }

  public ngOnInit(): void {
    this.modalConfig = new AppModalModel();

    this.yesButton = new AppButtonModel({
      onClick: () => {
        this._showSpinner = true;
        this.data.action(this.data.trip).subscribe(
          () => this._matDialogRef.close(true)
        );
      },
      label: {
        text: this.translateRoute + 'YES',
      },
    });

    this.noButton = new AppButtonModel({
      onClick: () => this._matDialogRef.close(false),
      label: {
        text: this.translateRoute + 'NO',
      },
    });
  }
}
