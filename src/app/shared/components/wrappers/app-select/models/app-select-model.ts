import { SelectAttribute } from '../../../../attributes/base/select-attribute';
import { AppSelectLabelModel, IAppSelectLabelConfiguration } from './app-select-label-model';
import { isDefined } from '../../../../utils/utils';

export interface IAppSelectConfiguration {
  label: IAppSelectLabelConfiguration;
  attribute: SelectAttribute<any>;
  maxWidth?: boolean;
}

export class AppSelectModel {
  public readonly label: AppSelectLabelModel;
  public readonly attribute: SelectAttribute<any>;
  public readonly maxWidth: boolean;

  constructor(configuration: IAppSelectConfiguration) {
    this.label = new AppSelectLabelModel(configuration.label);
    this.attribute = configuration.attribute;
    this.maxWidth = isDefined(configuration.maxWidth) ? configuration.maxWidth : false;
  }
}
