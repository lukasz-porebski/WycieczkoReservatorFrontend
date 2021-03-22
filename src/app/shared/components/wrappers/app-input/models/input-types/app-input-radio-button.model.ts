import { AppCheckboxAndRadioButtonInputLabelPosition } from '../../enums/app-checkbox-and-radio-button-input-label-position.enum';
import { AppInputColor } from '../../enums/app-checkbox-input-color.enum';
import { FormControl } from '@angular/forms';
import { isDefined } from '../../../../../utils/utils';
import { IAttribute } from '../../../../../interfaces/attribute.interface';
import { IAppInputLabel, AppInputLabelModel } from '../configurations/app-input-label.model';

export interface IAppRadioButtonInputModel<T> {
  options: T[];
  attribute?: IAttribute;
  optionLabelPosition?: AppCheckboxAndRadioButtonInputLabelPosition;
  translateOptionLabel?: boolean;
  color?: AppInputColor;
  optionText?: (option: T) => string;
  label?: IAppInputLabel;
}

export class AppInputRadioButtonModel<T> {
  public get value(): T {
    return this.formControl.value as T;
  }

  public get formControl(): FormControl {
    return isDefined(this.attribute) ? this.attribute.formControl : this._formControl;
  }

  public options: T[];
  public attribute: IAttribute;
  public optionLabelPosition: AppCheckboxAndRadioButtonInputLabelPosition;
  public translateOptionLabel: boolean;
  public color: AppInputColor;
  public optionText: (option: T) => string;
  public label: AppInputLabelModel;

  private readonly _formControl = new FormControl();

  constructor(configuration: IAppRadioButtonInputModel<T>) {
    this.options = [ ...configuration.options ];
    this.attribute = configuration.attribute;
    this.optionLabelPosition = configuration.optionLabelPosition;
    this.color = isDefined(configuration.color) ? configuration.color : AppInputColor.Default;
    this.optionText = configuration.optionText;
    this.translateOptionLabel = isDefined(configuration.translateOptionLabel) ? configuration.translateOptionLabel : true;
    this.label = isDefined(configuration.label) ? new AppInputLabelModel(configuration.label) : null;
  }

  public getOptionText(option: T): string | T {
    return isDefined(this.optionText) ? this.optionText(option) : option;
  }
}
