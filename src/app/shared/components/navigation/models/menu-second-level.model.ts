import { AppIcon } from '../../../enums/app-icon.enum';
import { MenuThirdLevelModel } from './menu-third-level.model';
import { isEmpty, isNotEmpty, replaceIfNotDefined } from '../../../utils/utils';
import { MenuLevelModel } from './menu-level.model';

export class MenuSecondLevelModel extends MenuLevelModel {
  public get isFianlActive(): boolean {
    return isEmpty(this.nextLevels) && this.isActive;
  }

  public nextLevels?: MenuThirdLevelModel[];

  constructor(translateRoute: string, navigateUrl?: string, icon?: AppIcon, thirdLevels?: MenuThirdLevelModel[]) {
    super(translateRoute, navigateUrl, icon);
    this.nextLevels = replaceIfNotDefined(thirdLevels, []);
  }

  public isThirdLevel(): boolean {
    return isNotEmpty(this.nextLevels);
  }
}
