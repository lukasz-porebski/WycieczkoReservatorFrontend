import { AppInputTextAreaModel } from './input-types/app-input-text-area.model';
import { AppInputCheckboxModel } from './input-types/app-input-checkbox.model';
import { AppInputBasicModel } from './input-types/app-input-basic.model';
import { AppInputRadioButtonModel } from './input-types/app-input-radio-button.model';
import { IAppInputLabel, AppInputLabelModel } from './configurations/app-input-label.model';
import { isDefined } from '../../../../utils/utils';

export interface IAppInput {
  label?: IAppInputLabel;
  readonly?: boolean;
  disabled?: boolean;
  input: AppInputBasicModel | AppInputTextAreaModel | AppInputCheckboxModel | AppInputRadioButtonModel<any>;
}

export class AppInputModel {
  public label: AppInputLabelModel;
  public readonly?: boolean;
  public disabled?: boolean;
  public input: AppInputBasicModel | AppInputTextAreaModel | AppInputCheckboxModel | AppInputRadioButtonModel<any>;

  constructor(configuration: IAppInput) {
    if (isDefined(configuration.label)) {
      this.label = new AppInputLabelModel(configuration.label);
    }
    this.readonly = isDefined(configuration.readonly) ? configuration.readonly : false;
    this.input = configuration.input;
    this.disabled = isDefined(configuration.disabled) ? configuration.disabled : false;
  }

  public disable(): void {
    this.disabled = true;
  }

  public enable(): void {
    this.disabled = false;
  }
}
