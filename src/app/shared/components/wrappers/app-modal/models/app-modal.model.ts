import { isDefined } from '../../../../utils/utils';

export interface IAppModalTitle {
  text: string;
  translate?: boolean;
  modalMaxWidth?: boolean;
  modalContentMaxWidth?: boolean;
}

export class AppModalModel {
  public text: string;
  public translate?: boolean;
  public modalMaxWidth?: boolean;
  public modalContentMaxWidth?: boolean;

  constructor(configuration: IAppModalTitle) {
    this.text = configuration.text;
    this.translate = isDefined(configuration.translate) ? configuration.translate : true;
    this.modalMaxWidth = isDefined(configuration.modalMaxWidth) ? configuration.modalMaxWidth : false;
    this.modalContentMaxWidth = isDefined(configuration.modalContentMaxWidth) ? configuration.modalContentMaxWidth : false;
  }
}
