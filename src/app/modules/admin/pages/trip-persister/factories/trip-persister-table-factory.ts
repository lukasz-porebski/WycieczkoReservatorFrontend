import { Injectable } from '@angular/core';
import { AdminServiceModule } from '../../../admin-service.module';
import { TripPersisterEntity } from '../entities/trip-persister-entity';
import { AppTableModel } from '../../../../../shared/components/wrappers/app-table/models/app-table.model';
import { ImagesListModel } from '../models/images-list-model';
import { AppTableColumnType } from '../../../../../shared/components/wrappers/app-table/enums/app-table-column-type.enum';
import { AppIcon } from '../../../../../shared/enums/app-icon.enum';

@Injectable({
  providedIn: AdminServiceModule
})
export class TripPersisterTableFactory {
  public createOtherImages(entity: TripPersisterEntity, translateRoute: string): AppTableModel<ImagesListModel> {
    return new AppTableModel<ImagesListModel>({
      translateRout: translateRoute + 'COLUMNS',
      headerSticky: true,
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
}
