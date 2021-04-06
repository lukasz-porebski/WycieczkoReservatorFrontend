import { Injectable } from '@angular/core';
import { AdminServiceModule } from '../../../admin-service.module';
import { TripPersisterEntity } from '../entities/trip-persister-entity';
import { AppTableModel } from '../../../../../shared/components/wrappers/app-table/models/app-table.model';
import { ImagesListModel } from '../models/images-list-model';
import { AppTableColumnType } from '../../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { AppIcon } from '../../../../../shared/enums/app-icon.enum';
import { UserListModel } from '../../users-list/models/user-list-model';
import { TripPersisterApiService } from '../services/trip-persister-api.service';
import { AppTablePaginatorPageSize } from '../../../../../shared/components/wrappers/app-table/enums/app-table-paginator-page-size.enum';

@Injectable({
  providedIn: AdminServiceModule
})
export class TripPersisterTableFactory {
  constructor(private readonly _apiService: TripPersisterApiService) {
  }

  public createOtherImages(entity: TripPersisterEntity, translateRoute: string): AppTableModel<ImagesListModel> {
    return new AppTableModel<ImagesListModel>({
      translateRout: translateRoute + 'OTHER_IMAGES_COLUMNS',
      dataSource: entity.otherImagesSubject,
      columns: [
        {
          field: 'url',
          type: AppTableColumnType.Text,
          imgPatch: data => data.url
        },
      ],
      columnsWithIcon: [
        {
          icon: AppIcon.Delete,
          onClick: data => entity.removeOtherImage(data.url)
        }
      ]
    });
  }

  public createGuides(entity: TripPersisterEntity, translateRoute: string): AppTableModel<UserListModel> {
    return new AppTableModel<UserListModel>({
      translateRout: translateRoute + 'GUIDES_COLUMNS',
      selection: {
        onRowSelect: row => entity.guideId.value = row?.id
      },
      dataSource: this._apiService.getGuidesToTripAssigne(),
      paginator: {
        defaultPageSize: AppTablePaginatorPageSize.Five,
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
  }
}
