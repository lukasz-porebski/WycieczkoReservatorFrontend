import { isDefined } from '../../../../../utils/utils';
import { IAttribute } from '../../../../../interfaces/attribute.interface';
import { IAppInputHint, AppInputHintModel } from '../configurations/app-input-hint.model';
import { FormControl } from '@angular/forms';

export interface IAppInputTextArea {
  minRows?: number;
  maxRows?: number;
  noOverflow?: boolean;
  attribute?: IAttribute;
  hint?: IAppInputHint;
}

export class AppInputTextAreaModel {
  public get formControl(): FormControl {
    return isDefined(this.attribute) ? this.attribute.formControl : this._formControl;
  }

  public minRows: number;
  public maxRows: number;
  public noOverflow: boolean;
  public attribute?: IAttribute;
  public hint?: AppInputHintModel;

  private readonly _formControl = new FormControl();

  constructor(configuration: IAppInputTextArea) {
    this.minRows = configuration.minRows;
    this.maxRows = configuration.maxRows;
    this.noOverflow = isDefined(configuration.noOverflow) ? configuration.noOverflow : false;
    this.attribute = configuration.attribute;
    this.hint = new AppInputHintModel(configuration.hint);
  }
}
