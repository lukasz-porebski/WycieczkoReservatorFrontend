import { AppInputBasicType } from '../../enums/app-input-basic-type.enum';
import { IAttribute } from '../../../../../interfaces/attribute.interface';
import { AppInputHintModel, IAppInputHint } from '../configurations/app-input-hint.model';
import { FormControl } from '@angular/forms';
import { isDefined } from '../../../../../utils/utils';

export interface IAppInputBasic {
  type: AppInputBasicType;
  attribute?: IAttribute;
  hint?: IAppInputHint;
  maxLength?: number;
  passwordShowButton?: boolean;
}

export class AppInputBasicModel {
  public get formControl(): FormControl {
    return isDefined(this.attribute) ? this.attribute.formControl : this._formControl;
  }

  public get isPasswordHidden(): boolean {
    return this._isPasswordHidden;
  }

  public get type(): AppInputBasicType {
    switch (this._type) {
      case AppInputBasicType.price:
        return AppInputBasicType.text;
      default:
        return this._type;
    }
  }

  public readonly mask: string;

  public attribute?: IAttribute;
  public hint?: AppInputHintModel;
  public maxLength?: number;
  public passwordShowButton?: boolean;

  private readonly _formControl = new FormControl();

  private _isPasswordHidden = true;
  private _type: AppInputBasicType;

  constructor(configuration: IAppInputBasic) {
    this._type = configuration.type;
    this.attribute = configuration.attribute;
    this.hint = new AppInputHintModel(configuration.hint);
    this.maxLength = configuration.maxLength;
    this.passwordShowButton = configuration.passwordShowButton;
    this.mask = this._getMask(this._type);
  }

  public changePasswordHideState(): void {
    this._isPasswordHidden = !this._isPasswordHidden;
    this._type = this._isPasswordHidden ? AppInputBasicType.password : AppInputBasicType.text;
  }

  private _getMask(type: AppInputBasicType): string {
    switch (type) {
      case AppInputBasicType.zipCode:
        return '00-000';
      case AppInputBasicType.price:
        return '0*,00';
      default:
        return null;
    }
  }
}
