import { AppIcon } from '../../../enums/app-icon.enum';
import { MenuLevelModel } from './menu-level.model';

export class MenuFirstLevelModel extends MenuLevelModel {
  public get isFianlActive(): boolean {
    return this.isActive;
  }

  constructor(translateRoute: string, navigateUrl?: string, icon?: AppIcon) {
    super(translateRoute, navigateUrl, icon);
  }
}
