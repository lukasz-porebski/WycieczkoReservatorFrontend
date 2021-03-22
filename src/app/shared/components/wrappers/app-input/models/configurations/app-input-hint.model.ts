import { AppInputHintAlign } from '../../enums/app-input-hint-align.enum';
import { isDefined } from '../../../../../utils/utils';

export interface IAppInputHint {
  hint?: string;
  hintAlign?: AppInputHintAlign;
}

export class AppInputHintModel {
  public hint?: string;
  public hintAlign?: AppInputHintAlign;

  constructor(configuration: IAppInputHint) {
    if (isDefined(configuration)) {
      this.hint = configuration.hint;
      this.hintAlign = configuration.hintAlign;
    }
  }
}
