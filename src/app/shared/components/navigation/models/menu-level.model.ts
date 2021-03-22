import { AppIcon } from '../../../enums/app-icon.enum';

export class MenuLevelModel {
  public get isFianlActive(): boolean {
    return false;
  }

  public translateRoute: string;
  public navigateUrl?: string;
  public icon?: AppIcon;
  public isActive = false;

  constructor(translateRoute: string, navigateUrl?: string, icon?: AppIcon) {
    this.translateRoute = translateRoute;
    this.navigateUrl = navigateUrl;
    this.icon = icon;
  }
}
