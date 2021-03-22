import { AppButtonColor } from '../enums/app-button-color.enum';
import { isDefined } from '../../../../utils/utils';
import { IAppButtonLabel, AppButtonLabelModel } from './app-button-label.model';

export interface IAppButton {
  label: IAppButtonLabel;
  color?: AppButtonColor;
  disabled?: boolean;
  matStepperNext?: boolean;
  onClick?: () => void;
  tooltip?: string;
}

export class AppButtonModel {
  public label: AppButtonLabelModel;
  public color: AppButtonColor;
  public disabled: boolean;
  public matStepperNext: boolean;
  public onClick: () => void;
  public tooltip: string;

  constructor(configuration: IAppButton) {
    this.label = isDefined(configuration.label) ? new AppButtonLabelModel(configuration.label) : null;
    this.color = isDefined(configuration.color) ? configuration.color : AppButtonColor.Accent;
    this.onClick = isDefined(configuration.onClick) ? configuration.onClick : () => null;
    this.disabled = configuration.disabled;
    this.matStepperNext = isDefined(configuration.matStepperNext) ? configuration.matStepperNext : false;
    this.tooltip = isDefined(configuration.tooltip) ? configuration.tooltip : null;
  }

  public disable(): void {
    this.disabled = true;
  }

  public enable(): void {
    this.disabled = false;
  }
}
