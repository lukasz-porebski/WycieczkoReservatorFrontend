import { isDefined } from '../../../../utils/utils';

export interface IAppListRowElementLabelModel {
  text: string;
  translate?: boolean;
}

export class AppListRowElementLabelModel {
  public text: string;
  public translate: boolean;

  constructor(configuration: IAppListRowElementLabelModel) {
    this.text = configuration?.text;
    this.translate = isDefined(configuration?.translate) ? configuration.translate : true;
  }
}
