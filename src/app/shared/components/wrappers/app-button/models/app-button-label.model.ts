import { isDefined } from '../../../../utils/utils';

export interface IAppButtonLabel {
  text: string;
  translate?: boolean;
}

export class AppButtonLabelModel {
  public text: string;
  public translate: boolean;

  constructor(configuration: IAppButtonLabel) {
    this.text = configuration.text;
    this.translate = isDefined(configuration.translate) ? configuration.translate : true;
  }
}
