import { isDefined } from '../../../../../utils/utils';

export interface IAppInputLabel {
  text: string;
  translate?: boolean;
  disableConvention?: boolean;
}

export class AppInputLabelModel {
  public text: string;
  public translate: boolean;
  public disableConvention?: boolean;

  constructor(configuration: IAppInputLabel) {
    this.text = configuration?.text;
    this.translate = isDefined(configuration?.translate) ? configuration.translate : true;
    this.disableConvention = configuration?.disableConvention;
  }
}
