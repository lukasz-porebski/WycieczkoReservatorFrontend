import { AppIcon } from '../../../enums/app-icon.enum';
import { MenuSecondLevelModel } from './menu-second-level.model';
import { isEmpty, isNotEmpty, replaceIfNotDefined } from '../../../utils/utils';
import { MenuLevelModel } from './menu-level.model';

export class MenuFirstLevelModel extends MenuLevelModel {
  public get isFianlActive(): boolean {
    return isEmpty(this.nextLevels) && this.isActive;
  }

  public nextLevels?: MenuSecondLevelModel[] = [];

  constructor(translateRoute: string, navigateUrl?: string, icon?: AppIcon, secondLevels?: MenuSecondLevelModel[]) {
    super(translateRoute, navigateUrl, icon);
    this.nextLevels = replaceIfNotDefined(secondLevels, []);
  }

  public isSecondLevel(): boolean {
    return isNotEmpty(this.nextLevels);
  }
}
