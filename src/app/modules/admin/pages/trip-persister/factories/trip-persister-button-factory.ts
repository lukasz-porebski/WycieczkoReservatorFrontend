/* tslint:disable:member-ordering */
import { Injectable } from '@angular/core';
import { AdminServiceModule } from '../../../admin-service.module';
import { TripPersisterEntity } from '../entities/trip-persister-entity';
import { AppButtonModel } from '../../../../../shared/components/wrappers/app-button/models/app-button.model';
import { TripPersisterMode } from '../enums/trip-persister-mode.enum';
import { AppRouting } from '../../../../../core/configurations/routing/app-routing';
import { TripPersisterRequestFactory } from './trip-persister-request-factory';
import { TripPersisterApiService } from '../services/trip-persister-api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../../shared/services/error.service';

@Injectable({
  providedIn: AdminServiceModule
})
export class TripPersisterButtonFactory {
  public constructor(private readonly _requestFactory: TripPersisterRequestFactory,
                     private readonly _apiService: TripPersisterApiService,
                     private readonly _router: Router,
                     private readonly _errorService: ErrorService) {
  }

  public createAddOtherImage(entity: TripPersisterEntity, translateRoute: string): AppButtonModel {
    return new AppButtonModel({
      onClick: () => entity.addOtherImage(),
      label: {
        text: translateRoute + 'ADD_IMAGE',
      },
    });
  }

  public createPersist(entity: TripPersisterEntity,
                       translateRoute: string,
                       mode: TripPersisterMode,
                       errors: string[]): AppButtonModel {
    const onPersist = (mode === TripPersisterMode.Creator)
      ? TripPersisterButtonFactory._createTrip
      : TripPersisterButtonFactory._editTrip;

    return new AppButtonModel({
      onClick: () => onPersist(
        entity, this._requestFactory, this._apiService, this._router, this._errorService, errors),
      label: {
        text: translateRoute + (mode === TripPersisterMode.Creator ? 'CREATE_TRIP' : 'EDIT_TRIP'),
      },
    });
  }

  private static _editTrip(entity: TripPersisterEntity,
                           requestFactory: TripPersisterRequestFactory,
                           apiService: TripPersisterApiService,
                           router: Router,
                           errorService: ErrorService,
                           errors: string[]): void {
    entity.whole.disable();
    const request = requestFactory.createTripEdit(entity);
    apiService
      .editTrip(request)
      .subscribe(
        () => router.navigateByUrl(AppRouting.trip.tripsList.absolutePath),
        (error: HttpErrorResponse) => {
          errors.splice(0, errors.length);
          errors.push(errorService.extractMessage(error));
          entity.whole.enable();
        });
  }

  private static _createTrip(entity: TripPersisterEntity,
                             requestFactory: TripPersisterRequestFactory,
                             apiService: TripPersisterApiService,
                             router: Router,
                             errorService: ErrorService,
                             errors: string[]): void {
    entity.whole.disable();
    const request = requestFactory.createTripCreate(entity);
    apiService
      .createTrip(request)
      .subscribe(
        () => router.navigateByUrl(AppRouting.trip.tripsList.absolutePath),
        (error: HttpErrorResponse) => {
          errors.splice(0, errors.length);
          errors.push(errorService.extractMessage(error));
          entity.whole.enable();
        });
  }
}
