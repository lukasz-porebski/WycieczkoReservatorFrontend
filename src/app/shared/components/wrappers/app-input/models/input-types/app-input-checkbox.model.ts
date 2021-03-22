import { AppCheckboxAndRadioButtonInputLabelPosition } from '../../enums/app-checkbox-and-radio-button-input-label-position.enum';
import { AppInputColor } from '../../enums/app-checkbox-input-color.enum';
import { IAttribute } from '../../../../../interfaces/attribute.interface';
import { FormControl } from '@angular/forms';
import { isDefined } from '../../../../../utils/utils';

export interface IAppInputCheckbox {
  labelPosition?: AppCheckboxAndRadioButtonInputLabelPosition;
  color?: AppInputColor;
  attribute?: IAttribute;
}

export class AppInputCheckboxModel {
  public get formControl(): FormControl {
    return isDefined(this.attribute) ? this.attribute.formControl : this._formControl;
  }

  public labelPosition: AppCheckboxAndRadioButtonInputLabelPosition;
  public color: AppInputColor;
  public attribute?: IAttribute;

  private readonly _formControl = new FormControl();

  constructor(configuration: IAppInputCheckbox) {
    this.labelPosition = configuration.labelPosition;
    this.color = isDefined(configuration.color) ? configuration.color : AppInputColor.Default;
    this.attribute = configuration.attribute;
  }
}
